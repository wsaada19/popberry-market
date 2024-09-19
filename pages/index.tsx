import React from 'react';
import PlayerSearch from './players';
import type { GetStaticProps } from 'next';
import type { BazarnStats } from '@types';
import playerData from '../components/d3/bazarnPoints.json';

export default function Home({ players }) {
  return <PlayerSearch players={players} />;
}

export const getStaticProps = (async () => {
  return { props: { players: playerData.playersDescending.slice(0, 200) as BazarnStats[] } };
}) satisfies GetStaticProps<{
  players: BazarnStats[];
}>;
