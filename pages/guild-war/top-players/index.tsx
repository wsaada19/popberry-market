import Layout from '@components/layouts/PageLayout';
import pixelsData from '../../../components/d3/guildWarsData.json';
import { Leaderboard } from '@components/leaderboards/Leaderboard';
import type { GetStaticProps } from 'next';
import { Player } from '@types';
import Select from 'react-select';
import { useState } from 'react';

export type Option = {
  value: string;
  label: string;
};

const options = [
  {
    value: 'totalPoints',
    label: 'Points',
  },
  {
    value: 'wateringCan',
    label: 'Plants Watered',
  },
  {
    value: 't1Seeds',
    label: 'T1 Seeds Planted',
  },
  {
    value: 't2Seeds',
    label: 'T2 Seeds Planted',
  },
  {
    value: 't3Seeds',
    label: 'T3 Seeds Planted',
  },
  {
    value: 'spores',
    label: 'Seed Points',
  },
  { value: 't1Guano', label: 'T1 Guano Used' },
  { value: 't2Guano', label: 'T2 Guano Used' },
  { value: 't3Guano', label: 'T3 Guano Used' },
  {
    value: 'guano',
    label: 'Guano Points',
  },
  { value: 't1Goo', label: 'T1 Goo Used' },
  { value: 't2Goo', label: 'T2 Goo Used' },
  { value: 't3Goo', label: 'T3 Goo Used' },
  {
    value: 'goo',
    label: 'Goo Points',
  },
  {
    value: 'pixels',
    label: 'Pixels Spent',
  },
  {
    value: 'totalCost',
    label: 'Coins Spent',
  },
];

export default function TopPlayer({ players }) {
  const [selected, setSelected] = useState(options[0]);
  const sortBy = (p: Player[]) => {
    switch (selected.value) {
      case 'guano':
        return p.sort((a, b) => b.fert.value - a.fert.value);
      case 'goo':
        return p.sort((a, b) => b.goo.value - a.goo.value);
      case 'spores':
        return p.sort((a, b) => b.spores.value - a.spores.value);
      case 'wateringCan':
        return p.sort((a, b) => Number(b.wateringCanUse) - Number(a.wateringCanUse));
      case 'pixels':
        return p.sort((a, b) => b.pixelsSpent - a.pixelsSpent);
      case 'totalPoints':
        return p.sort((a, b) => b.total.value - a.total.value);
      case 'totalCost':
        return p.sort((a, b) => b.totalCost - a.totalCost);
      case 't1Seeds':
        return p.sort((a, b) => b.spores.t1Seeds - a.spores.t1Seeds);
      case 't2Seeds':
        return p.sort((a, b) => b.spores.t2Seeds - a.spores.t2Seeds);
      case 't3Seeds':
        return p.sort((a, b) => b.spores.t3Seeds - a.spores.t3Seeds);
      case 't1Guano':
        return p.sort((a, b) => b.fert.t1Fert - a.fert.t1Fert);
      case 't2Guano':
        return p.sort((a, b) => b.fert.t2Fert - a.fert.t2Fert);
      case 't3Guano':
        return p.sort((a, b) => b.fert.t3Fert - a.fert.t3Fert);
      case 't1Goo':
        return p.sort((a, b) => b.goo.t1Goo - a.goo.t1Goo);
      case 't2Goo':
        return p.sort((a, b) => b.goo.t2Goo - a.goo.t2Goo);
      case 't3Goo':
        return p.sort((a, b) => b.goo.t3Goo - a.goo.t3Goo);
      default:
        return p.sort((a, b) => b.total.value - a.total.value);
    }
  };
  const getValue = (player: Player) => {
    switch (selected.value) {
      case 'guano':
        return player.fert.value;
      case 'goo':
        return player.goo.value;
      case 'spores':
        return player.spores.value;
      case 'wateringCan':
        return Number(player.wateringCanUse);
      case 't1Seeds':
        return player.spores.t1Seeds;
      case 't2Seeds':
        return player.spores.t2Seeds;
      case 't3Seeds':
        return player.spores.t3Seeds;
      case 't1Guano':
        return player.fert.t1Fert;
      case 't2Guano':
        return player.fert.t2Fert;
      case 't3Guano':
        return player.fert.t3Fert;
      case 't1Goo':
        return player.goo.t1Goo;
      case 't2Goo':
        return player.goo.t2Goo;
      case 't3Goo':
        return player.goo.t3Goo;
      case 'pixels':
        return player.pixelsSpent;
      case 'totalCost':
        return player.totalCost;
      default:
        return player.total.value;
    }
  };
  return (
    <Layout
      description="Leader board to view the top players in the pixels online guild war for planting, watering and more!"
      title="Popberry Analytics | Crops wars leaderboard"
    >
      <div>
        <div className="flex justify-between">
          <h1 className="text-base text-center text-blue-800 pt-2.5">
            Crop Wars Individual Leaderboard
          </h1>
          <Select
            onChange={(result) => {
              setSelected(result);
            }}
            placeholder="Select a task"
            className="w-full sm:w-1/3 text-black mb-4 float-right"
            options={options}
          />
        </div>
        <Leaderboard
          labels={[selected.label]}
          players={sortBy(players).map((player) => {
            return {
              name: player.name,
              playerId: player.id,
              scores: [getValue(player)],
            };
          })}
        />
      </div>
    </Layout>
  );
}

export const getStaticProps = (async () => {
  const topPlayers = pixelsData.filter(
    (p) =>
      p.total.rank <= 100 ||
      p.wateringCanRank <= 100 ||
      p.goo.rank <= 100 ||
      p.spores.rank <= 100 ||
      p.fert.rank <= 100 ||
      p.fert.t1Fert >= 2122 ||
      p.fert.t2Fert >= 7270 ||
      p.fert.t3Fert >= 14 ||
      p.goo.t1Goo >= 1010 ||
      p.goo.t2Goo >= 5155 ||
      p.goo.t3Goo >= 68 ||
      p.spores.t1Seeds >= 255 ||
      p.spores.t2Seeds >= 4050 ||
      p.spores.t3Seeds >= 39
  );

  return { props: { players: topPlayers } };
}) satisfies GetStaticProps<{
  players: Player[];
}>;
