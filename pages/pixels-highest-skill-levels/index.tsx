import Layout from '@components/layouts/PageLayout';
import { Date } from '@components/Date';
import { Leaderboard, LeaderboardEntry } from '@components/leaderboards/Leaderboard';
import { getBlobStorageFile } from '@services/azure/blobStorage';
import { convertData, getTotalLevel, getTotalExp } from '@utilities';
import { GetStaticProps } from 'next';
import { useState } from 'react';
import Select, { components } from 'react-select';
import Image from 'next/image';

type PlayerSkills = {
  playerId: string;
  name: string;
  levels: Record<string, number>;
};

const options = [
  {
    value: 'farming',
    label: 'Farming',
    icon: '/skills/farming.png',
  },
  {
    value: 'mining',
    label: 'Mining',
    icon: '/skills/mining.png',
  },
  {
    value: 'petcare',
    label: 'Pet Care',
    icon: '/skills/petcare.png',
  },
  {
    value: 'stoneshaping',
    label: 'Stoneshaping',
    icon: '/skills/stoneshaping.png',
  },
  {
    value: 'woodwork',
    label: 'Woodworking',
    icon: '/skills/woodwork.png',
  },
  {
    value: 'metalworking',
    label: 'Metalworking',
    icon: '/skills/metalworking.png',
  },
  {
    value: 'business',
    label: 'Business',
    icon: '/skills/business.png',
  },
  {
    value: 'cooking',
    label: 'Cooking',
    icon: '/skills/cooking.png',
  },
  {
    value: 'forestry',
    label: 'Forestry',
    icon: '/skills/forestry.png',
  },
  {
    value: 'overall',
    label: 'Overall Level',
  },
  {
    value: 'total',
    label: 'Total Level',
  },
];

const Option = (props) => (
  <components.Option {...props} className="country-option">
    <div>
      <span>
        {props.data.icon && (
          <Image
            style={{ display: 'inline-block' }}
            height={20}
            width={20}
            src={props.data.icon}
            alt="logo"
          />
        )}
      </span>
      <span className={props.data.icon ? 'pl-2' : 'pl-6'}>{props.data.label}</span>
    </div>
  </components.Option>
);
export default function SkillsLeaders({
  players,
  lastUpdated,
}: {
  players: PlayerSkills[];
  lastUpdated: string;
}) {
  const [selectedOption, setSelectedOption] = useState(options[options.length - 1]);
  return (
    <Layout
      description="Pixels Online top skill level player rankings and leaderboards."
      title="Popberry Analytics | Pixels Online Player Statistics"
    >
      <div className="sm:flex sm:justify-between">
        <h1 className="block pt-2 font-semibold my-auto text-base text-blue-800 h-11">
          {selectedOption.icon && (
            <span>
              <Image
                style={{ display: 'inline-block' }}
                src={selectedOption.icon}
                height={24}
                width={24}
                alt={selectedOption.label}
              />
            </span>
          )}
          <span className="pl-2">{selectedOption.label}</span>
        </h1>
        <Select
          onChange={(result) => {
            setSelectedOption(result);
          }}
          placeholder="Select a skill"
          className="mb-3 w-full sm:w-1/3 float-right text-black"
          options={options}
          components={{ Option }}
        />
      </div>
      <Leaderboard
        players={
          players
            .sort((a, b) => {
              if (a.levels[selectedOption.value] === undefined) {
                return 1;
              } else if (b.levels[selectedOption.value] === undefined) {
                return -1;
              }
              const aLevel = a.levels[selectedOption.value][0] || 0;
              const bLevel = b.levels[selectedOption.value][0] || 0;
              return bLevel - aLevel;
            })
            .map((p) => {
              return {
                name: p.name,
                playerId: p.playerId,
                scores: p.levels[selectedOption.value] || [0, 0],
              };
            })
            .slice(0, 200) as LeaderboardEntry[]
        }
        labels={['Level', 'Exp']}
      />
      <p className="text-2xs mb-1 leading-3 sm:text-xs sm:leading-4 mt-1">
        * This only includes players who have competed in one of the Pixels Online events.
      </p>
      <p className="text-2xs mb-4">
        Last updated <Date dateString={lastUpdated} />
      </p>
    </Layout>
  );
}

export const getStaticProps = (async () => {
  const blobResult = await getBlobStorageFile('pixels-data', 'skillLeaderboard.json');
  const topPlayerData = blobResult.results as {
    playerId: string;
    name: string;
    levels: Record<string, { level: number; totalExp: number }>;
  }[];

  const filteredPlayers = topPlayerData
    .map((p) => {
      p.levels['total'] = { level: getTotalLevel(p.levels), totalExp: getTotalExp(p.levels) };
      return {
        playerId: p.playerId,
        name: p.name,
        levels: p.levels,
      };
    })
    .filter((p) => {
      const farmingLevel = (p.levels?.farming?.level || 0) > 81;
      const miningLevel = (p.levels?.mining?.level || 0) > 78;
      const petCareLevel = (p.levels?.petcare?.level || 0) > 40;
      const stoneShapingLevel = (p.levels?.stoneshaping?.level || 0) > 79;
      const woodworkLevel = (p.levels?.woodwork?.level || 0) > 74;
      const metalworkingLevel = (p.levels?.metalworking?.level || 0) > 77;
      const businessLevel = (p.levels?.business?.level || 0) > 54;
      const cookingLevel = (p.levels?.cooking?.level || 0) > 70;
      const forestryLevel = (p.levels?.forestry?.level || 0) > 74;
      return (
        farmingLevel ||
        miningLevel ||
        petCareLevel ||
        stoneShapingLevel ||
        woodworkLevel ||
        metalworkingLevel ||
        businessLevel ||
        cookingLevel ||
        forestryLevel
      );
    })
    .map((p) => ({
      playerId: p.playerId,
      name: p.name,
      levels: convertData(p.levels),
    }));
  return {
    props: { players: filteredPlayers, lastUpdated: blobResult.lastModified },
  };
}) satisfies GetStaticProps<{
  players: PlayerSkills[];
}>;
