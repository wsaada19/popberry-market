import React from 'react';
import PlayerSearch, { PlayerSkills, getStaticProps as pGetStaticProps } from './players';
import type { GetStaticProps } from 'next';

export default function Home({ players }) {
  return <PlayerSearch players={players} />;
}

export const getStaticProps = (async () => {
  return pGetStaticProps();
}) satisfies GetStaticProps<{
  players: PlayerSkills[];
}>;
