import React from 'react';
import GuildWar from './guild-war';
import type { GetStaticProps } from 'next';
import type { Player } from '@types';
import pixelsData from '../components/d3/guildWarsData.json';

export default function Home({ players }) {
  return <GuildWar players={players} />;
}

export const getStaticProps = (async () => {
  return { props: { players: pixelsData } };
}) satisfies GetStaticProps<{
  players: Player[];
}>;
