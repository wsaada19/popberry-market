import Layout from '@components/layouts/PageLayout';
import Link from 'next/link';
import { useState } from 'react';
import { BazarnStats } from '@types';
import bazarnData from '@components/d3/bazarnPoints.json';
import { GetStaticProps } from 'next';
import { BazarnLeaderboard } from '@components/BazarnLeaderboard';
import { Snackbar } from '@components/Snackbar';

type PlayerSearchProps = {
  players: BazarnStats[];
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
      title="Pixels Statistics Player Search"
    >
      <div className="bg-blue-600 text-white py-8 md:py-14 mt-4 mb-2">
        <h1 className="mb-2 mt-0 text-2xl text-center text-white">Player Search</h1>
        <p className="text-sm px-6 sm:px-12">
          Search for a player by username or ID to view their event stats. Click on a player in the
          leader board to see more details.
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
      <Link className="text-xs mb-2" href="/guild-war/top-players">
        View Crop Wars Leader Boards
      </Link>
      <BazarnLeaderboard players={players} />
      <Snackbar opacity={bannerOpacity} message={errorMessage} />
    </Layout>
  );
}

export const getStaticProps = (async () => {
  return { props: { players: bazarnData.playersDescending.slice(0, 200) as BazarnStats[] } };
}) satisfies GetStaticProps<{
  players: BazarnStats[];
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
