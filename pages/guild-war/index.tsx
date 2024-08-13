import Layout from '@components/layouts/PageLayout';
import React, { useEffect, useRef, useState } from 'react';
import pixelsData from '../../components/d3/guildWarsData.json';
import Image from 'next/image';
import { addPixelsPlot } from '@components/d3/pixelsGuildWar';
import { Leaderboard, Player } from '@components/Leaderboard';
import Select from 'react-select';
import options from '../../components/guildData.json';

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

  const getTop100InGuild = () => {
    return pixelsData.filter((p) => p.guildId == guildData.value).filter((p) => p.total.rank <= 100)
      .length;
  };

  useEffect(() => {
    // @ts-ignore relax
    addPixelsPlot(pixelsData, ref, options[0].value, 'spores');
  }, []);

  return (
    <Layout description="Guild War data stuff" title="Guild War">
      {/* <h1 className="pt-1 pb-2">Pixels Guild War</h1> */}
      <Select
        onChange={(result) => {
          setGuildData(result);
          // @ts-ignore relax
          addPixelsPlot(pixelsData, ref, result.value, selected);
        }}
        className="w-1/3 float-right text-black border-purple"
        options={options}
      />
      <h1 className="mt-2 text-blue-800">{`${guildData.label} Stats`}</h1>
      <div className="pb-2 pt-3 mt-4 bg-blue-600 shadow-2xl text-white grid grid-cols-4">
        <StatDisplay value={`#${guildData.rank}`} type={`${guildData.bracket} Bracket`} />
        <StatDisplay value={`#${guildData.totalRank}`} type="Total Rank" />
        <StatDisplay value={guildData.score.toLocaleString()} type="Points scored" />
        <StatDisplay value={getTotalCost().toLocaleString()} type="Estimated Cost*" />
      </div>
      <div className="pt-2 pb-3 bg-blue-600 shadow-2xl text-white grid grid-cols-4">
        <StatDisplay value={getTop100InGuild()} type="Top 100 players" />
        <StatDisplay value={getTotalGooUsed().toLocaleString()} type={'Goo Used'} />
        <StatDisplay value={(getTotalCost() / guildData.score).toFixed(0)} type="Cost per point*" />
        <StatDisplay value={guildData.earnings.toLocaleString()} type="Earnings" />
      </div>
      <div className="mt-4 mb-6 text-base h-6 flex justify-center">
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
          title="Total"
          imageUrl="land.webp"
          graph={ref}
          setSelected={setSelected}
          selected={selected}
          guildId={guildData.value}
        />
      </div>
      <div className="my-8" ref={ref}></div>
      {/* ts-ignore relax */}
      <Leaderboard
        className="my-4"
        players={pixelsData as Player[]}
        guildId={guildData.value}
        selected={selected}
      />
      <p className="text-sm my-2">
        *Cost is an estimate assuming that players used T2 spores, goo and fertilizer for 500, 350
        and 300 coins respectively.
      </p>
      <p className="text-sm mb-2">
        **If players stopped pledging their shard after the event they may not be reflected in the
        data. If you see someone missing, please let me know on X.
      </p>
    </Layout>
  );
}

const StatDisplay = ({ value, type }) => {
  return (
    <span>
      <div className="text-md text-center md:text-lg font-bold">
        {type == 'Earnings' ? (
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
        {type == 'Estimated Cost*' ? (
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
      className={`cursor-pointer h-9 px-1 mx-2 border-b-4 ${
        selected == title.toLowerCase() && 'border-blue-700'
      }`}
    >
      <Image
        src={`/images/${imageUrl}`}
        height={title == 'Total' ? 22 : 26}
        width={title == 'Total' ? 22 : 26}
        alt="Github logo"
        style={{
          maxWidth: '100%',
          height: 'auto',
          display: 'inline',
        }}
      ></Image>
      <span className={`mr-2 md:mr-4 pl-2 font-semibold text-blue-700 dark:text-white`}>
        {title}
      </span>
    </button>
  );
};
