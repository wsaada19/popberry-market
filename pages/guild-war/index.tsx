import Layout from '@components/layouts/PageLayout';
import React, { useEffect, useRef, useState } from 'react';
import pixelsData from '../../components/d3/guildWarsData.json';
import Image from 'next/image';
import { addPixelsPlot } from '@components/d3/pixelsGuildWar';
import { Leaderboard, Player } from '@components/Leaderboard';
import Select from 'react-select';
import options from './guildData.json';

export default function GuildWar() {
  const ref = useRef(null);
  const [selected, setSelected] = useState('spores');
  const [guildData, setGuildData] = useState(options[0]);

  useEffect(() => {
    // @ts-ignore relax
    addPixelsPlot(pixelsData, ref, guildData.value, 'spores');
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
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            borderColor: state.isFocused || state.menuIsOpen ? '#805ad5' : baseStyles.borderColor,
          }),
        }}
      />
      <h1 className="mt-2 text-blue-800">{`${guildData.label} Stats`}</h1>
      <div className="p-3 mt-4 rounded-lg bg-purple shadow-lg text-white flex justify-evenly">
        <span>
          <div className="text-center text-lg font-bold">#{guildData.rank}</div>
          <div className="text-center text-xs">{guildData.bracket} Bracket</div>
        </span>
        <span>
          <div className="text-center text-lg font-bold">#{guildData.totalRank}</div>
          <div className="text-center text-xs">Total Rank</div>
        </span>
        <span>
          <div className="text-center text-lg font-bold">{guildData.score.toLocaleString()}</div>
          <div className="text-center text-xs">Points scored</div>
        </span>
        <span>
          <div className="text-center text-lg font-bold">200,453</div>
          <div className="text-center text-xs">Goo used</div>
        </span>
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
      <Leaderboard className="my-3" players={pixelsData as Player[]} guildId={guildData.value} />
      {/* <TeamLeaderBoard
        className="m-y-3"
        teams={mostEfficientTeams(data === 'current' ? teamData : pastTeamData)}
      /> */}
    </Layout>
  );
}

const Tab = ({ title, imageUrl, graph, setSelected, selected, guildId }) => {
  return (
    <button
      onClick={() => {
        // @ts-ignore relax
        addPixelsPlot(pixelsData, graph, guildId, title.toLowerCase());
        setSelected(title.toLowerCase());
      }}
      className={`cursor-pointer h-9 px-1 mx-2 border-b-4 ${
        selected == title.toLowerCase() && 'border-purple'
      }`}
    >
      <Image
        src={`/images/${imageUrl}`}
        height={title == 'Total' ? 20 : 24}
        width={title == 'Total' ? 20 : 24}
        alt="Github logo"
        style={{
          maxWidth: '100%',
          height: 'auto',
          display: 'inline',
        }}
      ></Image>
      <span className={`mr-2 md:mr-4 pl-2 font-semibold text-purple dark:text-white`}>{title}</span>
    </button>
  );
};
