import Layout from '@components/layouts/PageLayout';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Guild, PlayerData } from '@types';
import { StatDisplay } from '@components/StatDisplay';
import { getBlobStorageFile } from '@services/azure/blobStorage';
import { initRadarChart } from '@components/d3/radarChart';
import { useEffect, useRef, useState } from 'react';
import { capitalizeFirstLetter } from '@utilities';

type GuildInfo = {
  guildId: string;
  guildName: string;
  guildRank: number;
  bracket: string;
};

type PlayerPageProps = {
  playerData: PlayerData;
  guildInfo: GuildInfo;
};
export default function PlayerPage({ playerData, guildInfo }: PlayerPageProps) {
  const bazarnData = playerData.individualEvents.find((item) => item.eventId == '2');
  const cropWarsData = playerData.cropWarsEvents.find((item) => item.eventId == '1');

  const [skills, setSkills] = useState({});
  const ref = useRef(null);
  useEffect(() => {
    getPlayerSkills();
  }, []);

  useEffect(() => {
    // @ts-ignore relax
    if (skills.length > 0) initRadarChart(ref, skills);
  }, [skills]);

  const getPlayerSkills = async () => {
    const result = await fetch(`/api/players?username=${encodeURIComponent(playerData.playerId)}`);
    const data = await result.json();
    const skillMap = Object.keys(data.data.levels)
      .filter((key) => key != 'exploration' && key != 'overall')
      .map((key) => ({
        axis: capitalizeFirstLetter(key),
        value: data.data.levels[key].level,
      }));
    setSkills(skillMap);
  };
  return (
    <Layout
      description={`${playerData.name} Pixels event statistics for events such as Crop Wars and Barney's Bazarn Blitz.`}
      title={`${playerData.name} Pixels Statistics`}
    >
      <div>
        <h1 className="text-xl text-center text-blue-800 mb-2">{playerData.name}</h1>
        {bazarnData && (
          <>
            <h5 className="font-semibold sm:text-lg">Barney&apos;s Bazaarn Blitz</h5>
            <div className="mb-1 px-1 py-3 bg-blue-600 text-white grid grid-cols-2 md:grid-cols-4 gap-2">
              <StatDisplay value={`#${bazarnData.rank}`} type="Rank" />
              <StatDisplay value={bazarnData.score.toLocaleString()} type="Points" />
              <StatDisplay
                value={bazarnData.costEstimate.toLocaleString()}
                type="Cost estimate*"
                icon="coin"
              />
              <StatDisplay
                value={bazarnData.reward.toLocaleString()}
                type="Earnings"
                icon="pixel"
                tooltip={`$${Number((bazarnData.reward * 0.1531).toFixed(2)).toLocaleString()} USD`}
              />
            </div>
            <p className="text-2xs mb-4 leading-3 sm:text-xs sm:leading-4">
              * The cost estimate is based on average event prices, assuming each point cost around
              2,194 coins.
            </p>
          </>
        )}
        {cropWarsData && (
          <>
            <h5 className="mt-3 font-semibold sm:text-lg">Crop Wars</h5>
            {guildInfo?.guildName.length > 0 && (
              <div className="flex justify-between">
                <p className="text-xs sm:text-sm font-bold">{`${guildInfo.guildName} Guild`}</p>
                <p className="text-sm">
                  <strong>#{guildInfo.guildRank}</strong> in the{' '}
                  <strong>{guildInfo.bracket}</strong> bracket
                </p>
              </div>
            )}
            <div className="mt-1 mb-4 py-3 bg-blue-600 text-white grid grid-cols-2 md:grid-cols-4 gap-3">
              <StatDisplay value={cropWarsData.total.value.toLocaleString()} type="Points" />
              <StatDisplay value={`#${cropWarsData.total.rank}`} type="Player rank" />
              <StatDisplay
                value={cropWarsData.costs.pixelsSpent.toLocaleString()}
                type="Pixels spent"
                icon="pixel"
              />
              <StatDisplay
                value={cropWarsData.costs.totalCost.toLocaleString()}
                type="Coins spent"
                icon="coin"
              />
              <StatDisplay
                value={Number(cropWarsData.watering.wateringCanUse).toLocaleString()}
                type="Plants watered"
              />
              <StatDisplay value={cropWarsData.spores.value.toLocaleString()} type="Seeds" />
              <StatDisplay value={cropWarsData.goo.value.toLocaleString()} type="Goo" />
              <StatDisplay value={cropWarsData.fert.value.toLocaleString()} type="Fert" />
              <StatDisplay
                value={`#${cropWarsData.watering.wateringCanRank?.toLocaleString()}`}
                type="Watering Rank"
              />
              <StatDisplay
                value={`#${cropWarsData.spores.rank.toLocaleString()}`}
                type="Seed Rank"
              />
              <StatDisplay value={`#${cropWarsData.goo.rank.toLocaleString()}`} type="Goo Rank" />
              <StatDisplay
                value={`#${cropWarsData.fert.rank.toLocaleString()}`}
                type="Fertilizer Rank"
              />
            </div>
          </>
        )}
        <h4 className="font-semibold sm:text-lg mb-0">Player Skills</h4>
        <div className="w-full flex">
          <svg className="mb-4 dark:text-white" ref={ref}></svg>
        </div>
      </div>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const allPlayerData = (await getBlobStorageFile('pixels-data', 'playerData.json'))
    .results as PlayerData[];

  const paths = allPlayerData.map((item) => {
    return {
      params: {
        playerId: item.playerId,
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const allPlayerData = (await getBlobStorageFile('pixels-data', 'playerData.json'))
    .results as PlayerData[];

  const guildData = (await getBlobStorageFile('pixels-data', 'guildStats.json')).results as Guild[];
  const player = allPlayerData.find((item) => item.id === params.playerId);
  const guild = guildData.find((item) => item.value === player?.guildId);

  const guildInfo = {
    guildId: guild?.value || '',
    guildName: guild?.label || '',
    guildRank: guild?.rank || 0,
    bracket: guild?.bracket || '',
  };

  return {
    props: {
      guildInfo: guildInfo,
      playerData: player,
    },
  };
};
