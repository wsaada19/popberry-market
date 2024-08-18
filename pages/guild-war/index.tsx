import Layout from '@components/layouts/PageLayout';
import React, { useEffect, useRef, useState } from 'react';
import pixelsData from '../../components/d3/guildWarsData.json';
import Image from 'next/image';
import { addPixelsPlot } from '@components/d3/pixelsGuildWar';
import { Leaderboard } from '@components/Leaderboard';
import { Player } from '@types';
import Select from 'react-select';
import options from '../../components/guildData.json';
import { pixelsLoader } from '@utilities';

export default function GuildWar() {
  const ref = useRef(null);
  const [selected, setSelected] = useState('spores');
  const [guildData, setGuildData] = useState(options[0]);

  const getTotalCost = () => {
    const res = pixelsData
      .filter((p) => p.guildId == guildData.value)
      .reduce((acc, curr) => {
        return acc + curr.totalCost;
      }, 0)
      .toFixed(0);

    return Number(res);
  };

  const getTotalGooUsed = () => {
    return pixelsData
      .filter((p) => p.guildId == guildData.value)
      .reduce((acc, curr) => {
        return acc + curr.goo.value;
      }, 0);
  };

  const getPixelsSpent = () => {
    return pixelsData
      .filter((p) => p.guildId == guildData.value)
      .reduce((acc, curr) => {
        return acc + curr.pixelsSpent;
      }, 0);
  };

  const getTop100InGuild = () => {
    return pixelsData.filter((p) => p.guildId == guildData.value).filter((p) => p.total.rank <= 100)
      .length;
  };

  useEffect(() => {
    // @ts-ignore relax
    addPixelsPlot(pixelsData, ref, options[0].value, 'spores');
  }, []);

  return (
    <Layout description="Guild statistics from the pixels online mushroom war" title="Guild War">
      <Select
        onChange={(result) => {
          setGuildData(result);
          // @ts-ignore relax
          addPixelsPlot(pixelsData, ref, result.value, selected);
        }}
        placeholder="Guild Search"
        className="w-full sm:w-1/3 float-right text-black border-purple"
        options={options}
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
        <StatDisplay value={getTotalCost().toLocaleString()} type="Coins spent" />
        <StatDisplay value={getTop100InGuild()} type="Top 100 players" />
        <StatDisplay value={getTotalGooUsed().toLocaleString()} type={'Goo Used'} />
        <StatDisplay value={getPixelsSpent().toLocaleString()} type="Pixels spent" />
        <StatDisplay value={guildData.earnings.toLocaleString()} type="Earnings" />
      </div>
      <Leaderboard
        className="my-5"
        players={pixelsData as Player[]}
        guildId={guildData.value}
        selected={selected}
      />
      <h3>Player Graph</h3>
      <div className="mt-2 mb-4" ref={ref}></div>
      <div className="mt-4 mb-8 text-base flex justify-center">
        <Tab
          title="Spores"
          imageUrl="spores.png"
          graph={ref}
          setSelected={setSelected}
          selected={selected}
          guildId={guildData.value}
        />
        <Tab
          title="Guano"
          imageUrl="guano.png"
          graph={ref}
          setSelected={setSelected}
          selected={selected}
          guildId={guildData.value}
        />
        <Tab
          title="Goo"
          imageUrl="goo.png"
          graph={ref}
          setSelected={setSelected}
          selected={selected}
          guildId={guildData.value}
        />
        <Tab
          title="Watering"
          imageUrl="watering-can.png"
          graph={ref}
          setSelected={setSelected}
          selected={selected}
          guildId={guildData.value}
        />
        <Tab
          title="Total"
          imageUrl="land.webp"
          graph={ref}
          setSelected={setSelected}
          selected={selected}
          guildId={guildData.value}
        />
      </div>
      {/* ts-ignore relax */}
    </Layout>
  );
}

const StatDisplay = ({ value, type }) => {
  return (
    <span>
      <div className="text-lg text-center md:text-xl font-bold">
        {type == 'Earnings' || type == 'Pixels spent' ? (
          <Image
            src={`/images/pixel.webp`}
            height={24}
            width={24}
            alt="Pixel"
            style={{
              maxWidth: '100%',
              height: 'auto',
              display: 'inline',
              paddingBottom: '4px',
              paddingRight: '4px',
            }}
          ></Image>
        ) : (
          <></>
        )}
        {type == 'Coins spent' ? (
          <Image
            src={`/images/coin.webp`}
            height={24}
            width={24}
            alt="Coin"
            style={{
              maxWidth: '100%',
              height: 'auto',
              display: 'inline',
              paddingBottom: '4px',
              paddingRight: '4px',
            }}
          ></Image>
        ) : (
          <></>
        )}
        {value}
      </div>
      <div className="text-center text-xs">{type}</div>
    </span>
  );
};

const Tab = ({ title, imageUrl, graph, setSelected, selected, guildId }) => {
  return (
    <button
      onClick={() => {
        // @ts-ignore relax
        addPixelsPlot(pixelsData, graph, guildId, title.toLowerCase());
        setSelected(title.toLowerCase());
      }}
      className={`cursor-pointer h-9 px-2 mx-2 border-b-4 ${
        selected == title.toLowerCase() && 'border-blue-700'
      }`}
    >
      {title !== 'Total' && (
        <Image
          src={`/images/${imageUrl}`}
          height={title == 'Total' ? 28 : 32}
          width={title == 'Total' ? 28 : 32}
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
