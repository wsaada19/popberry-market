import Layout from '@components/layouts/PageLayout';
import React, { useEffect, useRef, useState } from 'react';
import pixelsData from '../../components/d3/guildWarsData.json';
import Image from 'next/image';
import { addPixelsPlot } from '@components/d3/pixelsGuildWar';
import { Leaderboard } from '@components/leaderboards/CropWarsLeaderboard';
import { Guild, Player } from '@types';
import Select from 'react-select';
import { pixelsLoader } from '@utilities';
import type { GetStaticProps } from 'next';
import { StatDisplay } from '@components/StatDisplay';
import { getBlobStorageFile } from '@services/azure/blobStorage';

export default function GuildWar({ players, guilds }) {
  const ref = useRef(null);
  const [selected, setSelected] = useState('spores');
  const [guildData, setGuildData] = useState(guilds[0]);

  const getTotalGooUsed = () => {
    return guildData.stats.t1Goo + guildData.stats.t2Goo + guildData.stats.t3Goo;
  };

  const getTop100InGuild = () => {
    return players.filter((p) => p.guildId == guildData.value).filter((p) => p.total.rank <= 100)
      .length;
  };

  useEffect(() => {
    // @ts-ignore relax
    addPixelsPlot(players, ref, guilds[0].value, 'spores');
  }, []);

  return (
    <Layout
      description="Guild statistics from the pixels online mushroom war, including spores, guano, goo, watering, and total stats."
      title="Popberry Analytics | Stats for top guilds in the Pixels Mushroom War"
    >
      <Select
        onChange={(result) => {
          setGuildData(result);
          // @ts-ignore relax
          addPixelsPlot(players, ref, result.value, selected);
        }}
        placeholder="Guild Search"
        className="w-full sm:w-1/3 float-right text-black border-purple"
        options={guilds}
        styles={{
          control: (baseStyles) => ({
            ...baseStyles,
            marginBottom: '8px',
          }),
        }}
      />
      <div>
        <h1 className="text-blue-800 inline">{`${guildData.label}`}</h1>
        <Image
          src={guildData.emblem}
          loader={pixelsLoader}
          height={48}
          width={48}
          alt={`${guildData.label} Emblem`}
          style={{
            maxWidth: '100%',
            height: 'auto',
            display: 'inline-block',
            paddingBottom: '12px',
            paddingLeft: '8px',
          }}
        ></Image>
      </div>
      <div className="p-3 mt-1 sm:mt-4 bg-blue-600 shadow-2xl text-white grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatDisplay value={`#${guildData.rank}`} type={`${guildData.bracket} Bracket`} />
        <StatDisplay value={`#${guildData.totalRank}`} type="Total Rank" />
        <StatDisplay value={guildData.score.toLocaleString()} type="Points scored" />
        <StatDisplay
          value={guildData.stats.coinsSpent.toLocaleString()}
          type="Coins spent"
          icon="coin"
        />
        <StatDisplay value={getTop100InGuild()} type="Top 100 players" />
        <StatDisplay value={getTotalGooUsed().toLocaleString()} type={'Goo Used'} />
        <StatDisplay
          value={guildData.stats.pixelsSpent.toLocaleString()}
          type="Pixels spent"
          icon="pixel"
        />
        <StatDisplay value={guildData.earnings.toLocaleString()} type="Earnings" icon="pixel" />
      </div>
      <Leaderboard
        className="my-5"
        players={players as Player[]}
        guildId={guildData.value}
        selected={selected}
      />
      <h3>Player Graph</h3>
      <div className="mt-2 mb-4" ref={ref}></div>
      <div className="mt-4 mb-8 text-base flex justify-center">
        <Tab
          title="Spores"
          imageUrl="/crop-wars/spores.png"
          graph={ref}
          setSelected={setSelected}
          selected={selected}
          guildId={guildData.value}
          players={players}
        />
        <Tab
          title="Guano"
          imageUrl="/crop-wars/guano.png"
          graph={ref}
          setSelected={setSelected}
          selected={selected}
          guildId={guildData.value}
          players={players}
        />
        <Tab
          title="Goo"
          imageUrl="/crop-wars/goo.png"
          graph={ref}
          setSelected={setSelected}
          selected={selected}
          guildId={guildData.value}
          players={players}
        />
        <Tab
          title="Watering"
          imageUrl="/images/watering-can.png"
          graph={ref}
          setSelected={setSelected}
          selected={selected}
          guildId={guildData.value}
          players={players}
        />
        <Tab
          title="Total"
          imageUrl="/images/land.webp"
          graph={ref}
          setSelected={setSelected}
          selected={selected}
          guildId={guildData.value}
          players={players}
        />
      </div>
      {/* ts-ignore relax */}
    </Layout>
  );
}

export const getStaticProps = (async () => {
  const guildStats = (await getBlobStorageFile('pixels-data', 'guildStats.json'))
    .results as Guild[];
  return { props: { players: pixelsData, guilds: guildStats } };
}) satisfies GetStaticProps<{
  players: Player[];
}>;

const Tab = ({ title, imageUrl, graph, setSelected, selected, guildId, players }) => {
  return (
    <button
      onClick={() => {
        // @ts-ignore relax
        addPixelsPlot(players, graph, guildId, title.toLowerCase());
        setSelected(title.toLowerCase());
      }}
      className={`cursor-pointer h-9 px-2 mx-2 border-b-4 ${
        selected == title.toLowerCase() && 'border-blue-700'
      }`}
    >
      {title !== 'Total' && (
        <Image
          src={`${imageUrl}`}
          height={title == 'Total' ? 24 : 28}
          width={title == 'Total' ? 24 : 28}
          alt={title}
          style={{
            maxWidth: '100%',
            height: 'auto',
            display: 'inline',
            paddingBottom: '4px',
          }}
        ></Image>
      )}
      <span className={`font-semibold text-blue-700 dark:text-white`}>
        {title === 'Total' ? title : ''}
      </span>
    </button>
  );
};
