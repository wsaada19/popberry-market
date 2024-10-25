import Layout from '@components/layouts/PageLayout';
import { useState } from 'react';
import { convertData, getTotalLevel, getTotalExp } from '@utilities';
import { GetStaticProps } from 'next';
import { Leaderboard } from '@components/leaderboards/Leaderboard';
import { Snackbar } from '@components/Snackbar';
import { getBlobStorageFile } from '@services/azure/blobStorage';

export type PlayerSkills = {
  playerId: string;
  name: string;
  levels: Record<string, number[]>;
};

type PlayerSearchProps = {
  players: PlayerSkills[];
};

export default function PlayerSearch({ players }: PlayerSearchProps) {
  const [search, setSearch] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [bannerOpacity, setBannerOpacity] = useState('0');
  const playerSearch = async () => {
    const result = await fetch(`/api/players?username=${encodeURIComponent(search)}`);
    if (result.status === 404) {
      setError('Player not found');
    } else if (result.status === 200) {
      const data = await result.json();
      window.location.href = `/players/${data.data['_id']}`;
    } else {
      setError('An error occurred while making the request');
    }
  };

  const setError = (message: string) => {
    setErrorMessage(message);
    setBannerOpacity('100');
    setTimeout(() => {
      setBannerOpacity('0');
    }, 4000);
  };
  return (
    <Layout
      description={`Pixels Online event statistics for players from events such as Pixels Crop Wars and Barney's Bazarn Event.`}
      title="Pixels Online Player Search"
    >
      <div className="bg-blue-600 text-white py-8 md:py-14 mb-4">
        <h1 className="mb-2 mt-0 text-2xl text-center text-white">Player Search</h1>
        <p className="text-sm px-6 sm:px-12">
          Search for a player by username, wallet address or ID to view their event stats. Click on
          a player in the leader board to see more details.
        </p>
        <div className="mt-6 flex justify-center align-middle">
          <input
            className="ml-4 mr-1 bg-white text-black p-2 rounded-md w-full sm:w-1/2 border-blue-600 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            type="text"
            placeholder="Search for a player"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') playerSearch();
            }}
          />
          <button className="mr-4" onClick={playerSearch}>
            <SearchSVG />
          </button>
        </div>
      </div>
      <h2 className="text-base mb-1">Total Level</h2>
      <Leaderboard
        players={players.map((p) => ({
          name: p.name,
          playerId: p.playerId,
          scores: p.levels.total,
        }))}
        labels={['Level', 'Exp']}
      />
      <p className="text-2xs mb-4 leading-3 sm:text-xs sm:leading-4 mt-1">
        * This only includes players who have competed in one of the Pixels Online events.
      </p>
      <Snackbar opacity={bannerOpacity} message={errorMessage} />
    </Layout>
  );
}

export const getStaticProps = (async () => {
  const topPlayerData = (await getBlobStorageFile('pixels-data', 'skillLeaderboard.json'))
    .results as {
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
      const overallLevel = (p.levels?.total?.level || 0) > 600;
      return overallLevel;
    })
    .map((p) => ({
      playerId: p.playerId,
      name: p.name,
      levels: convertData(p.levels),
    }));
  return { props: { players: filteredPlayers } };
}) satisfies GetStaticProps<{
  players: PlayerSkills[];
}>;

const SearchSVG = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
};
