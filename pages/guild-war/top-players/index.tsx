import Layout from '@components/layouts/PageLayout';
import pixelsData from '../../../components/d3/guildWarsData.json';
import { SmallLeaderboard } from '@components/SmallLeaderboard';
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
  return (
    <Layout description="Top Players for different tasks" title="Guild War">
      <div>
        <Select
          onChange={(result) => {
            setSelected(result);
          }}
          placeholder="Select a task"
          className="w-full sm:w-1/2 text-black mb-5"
          options={options}
        />
        <div></div>
        <SmallLeaderboard players={players} className="mt-2" selected={selected} />
      </div>
    </Layout>
  );
}

export const getStaticProps = (async () => {
  return { props: { players: pixelsData } };
}) satisfies GetStaticProps<{
  players: Player[];
}>;
