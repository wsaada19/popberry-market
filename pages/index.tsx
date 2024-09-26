import React from 'react';
import PlayerSearch from './players';
import type { GetStaticProps } from 'next';
import type { BazarnStats } from '@types';
import playerData from '../components/d3/bazarnData.json';

export default function Home({ players }) {
  return <PlayerSearch players={players} />;
}

export const getStaticProps = (async () => {
  return { props: { players: playerData.slice(0, 200) as BazarnStats[] } };
}) satisfies GetStaticProps<{
  players: BazarnStats[];
}>;
