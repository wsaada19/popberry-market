import Layout from '@components/layouts/PageLayout';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Guild, PlayerData } from '@types';
import { StatDisplay } from '@components/StatDisplay';
import { getBlobStorageFile } from '@services/azure/blobStorage';
import { initRadarChart } from '@components/d3/radarChart';
import { useEffect, useRef, useState } from 'react';
import { capitalizeFirstLetter } from '@utilities';
import Link from 'next/link';
import Image from 'next/image';

type GuildInfo = {
  guildId: string;
  guildName: string;
  guildRank: number;
  bracket: string;
};

type PlayerPageProps = {
  playerData: PlayerData;
  guildInfo: GuildInfo;
};
export default function PlayerPage({ playerData, guildInfo }: PlayerPageProps) {
  const bazarnData = playerData.individualEvents.find((item) => item.eventId == '2');
  const cropWarsData = playerData.cropWarsEvents.find((item) => item.eventId == '1');

  const [skills, setSkills] = useState({});
  const [wallets, setWallets] = useState([]);
  const [page, setPage] = useState('stats');
  const [nftCollection, setNftCollection] = useState([]);
  const ref = useRef(null);

  useEffect(() => {
    getPlayerSkills();
  }, []);

  useEffect(() => {
    if (wallets.length > 0) {
      getNftCollection();
    }
  }, [wallets]);

  useEffect(() => {
    // @ts-ignore relax
    if (skills.length > 0 && page == 'stats') initRadarChart(ref, skills);
  }, [skills, page]);

  const getPlayerSkills = async () => {
    const result = await fetch(`/api/players?username=${encodeURIComponent(playerData.playerId)}`);
    const data = await result.json();
    const skillMap = Object.keys(data.data.levels)
      .filter((key) => key != 'exploration' && key != 'overall')
      .map((key) => ({
        axis: capitalizeFirstLetter(key),
        value: data.data.levels[key].level,
      }));
    setSkills(skillMap);
    setWallets(data.data.cryptoWallets);
  };

  const getNftCollection = async () => {
    const query = wallets.map((wallet) => `wallet=${wallet.address}`).join('&');
    const result = await fetch(`/api/playerNfts?${query}`);
    const data = await result.json();
    setNftCollection(data.data);
  };

  return (
    <Layout
      description={`${playerData.name} Pixels event statistics for events such as Crop Wars and Barney's Bazarn Blitz.`}
      title={`${playerData.name} Pixels Statistics`}
    >
      <div>
        <h1 className="text-xl text-center text-blue-800 mb-2">{playerData.name}</h1>
        <ul className="flex flex-wrap text-sm font-medium text-center">
          <li className="">
            <a
              href="#"
              aria-current="page"
              onClick={() => setPage('stats')}
              className={`inline-block px-3 py-1 text-blue-600 ${
                page == 'stats'
                  ? 'border-blue-700 dark:border-white'
                  : 'border-blue-300 dark:border-gray-500'
              } rounded-t-lg active  dark:text-blue-500 border-b-2 hover:border-blue-700 dark:hover:border-white hover:no-underline`}
            >
              Statistics
            </a>
          </li>
          <li className="ml-2">
            <a
              href="#"
              className={`inline-block px-3 py-1 rounded-t-lg ${
                page == 'nfts'
                  ? 'border-blue-700 dark:border-white'
                  : 'border-blue-300 dark:border-gray-500'
              } border-b-2 hover:border-blue-700 dark:hover:border-white hover:no-underline`}
              onClick={() => setPage('nfts')}
            >
              NFT Collection
            </a>
          </li>
        </ul>

        {bazarnData && page == 'stats' && (
          <>
            <h5 className="font-semibold sm:text-lg mt-3">Barney&apos;s Bazaarn Blitz</h5>
            <div className="mb-1 px-1 py-3 bg-blue-600 text-white grid grid-cols-2 md:grid-cols-4 gap-2">
              <StatDisplay value={`#${bazarnData.rank}`} type="Rank" />
              <StatDisplay value={bazarnData.score.toLocaleString()} type="Points" />
              <StatDisplay
                value={bazarnData.costEstimate.toLocaleString()}
                type="Cost estimate*"
                icon="coin"
              />
              <StatDisplay
                value={bazarnData.reward.toLocaleString()}
                type="Earnings"
                icon="pixel"
                tooltip={`$${Number((bazarnData.reward * 0.1531).toFixed(2)).toLocaleString()} USD`}
              />
            </div>
            <p className="text-2xs mb-2 leading-3 sm:text-xs sm:leading-4">
              * The cost estimate is based on average event prices, assuming each point cost around
              2,194 coins.
            </p>
          </>
        )}
        {cropWarsData && page == 'stats' && (
          <>
            <h5 className="mt-3 font-semibold sm:text-lg">Crop Wars</h5>
            {guildInfo?.guildName.length > 0 && (
              <div className="flex justify-between">
                <p className="text-xs sm:text-sm font-bold">{`${guildInfo.guildName} Guild`}</p>
                <p className="text-sm">
                  <strong>#{guildInfo.guildRank}</strong> in the{' '}
                  <strong>{guildInfo.bracket}</strong> bracket
                </p>
              </div>
            )}
            <div className="mt-1 mb-2 py-3 bg-blue-600 text-white grid grid-cols-2 md:grid-cols-4 gap-3">
              <StatDisplay value={cropWarsData.total.value.toLocaleString()} type="Points" />
              <StatDisplay value={`#${cropWarsData.total.rank}`} type="Player rank" />
              <StatDisplay
                value={cropWarsData.costs.pixelsSpent.toLocaleString()}
                type="Pixels spent"
                icon="pixel"
              />
              <StatDisplay
                value={cropWarsData.costs.totalCost.toLocaleString()}
                type="Coins spent"
                icon="coin"
              />
              <StatDisplay
                value={Number(cropWarsData.watering.wateringCanUse).toLocaleString()}
                type="Plants watered"
              />
              <StatDisplay value={cropWarsData.spores.value.toLocaleString()} type="Seeds" />
              <StatDisplay value={cropWarsData.goo.value.toLocaleString()} type="Goo" />
              <StatDisplay value={cropWarsData.fert.value.toLocaleString()} type="Fert" />
              <StatDisplay
                value={`#${cropWarsData.watering.wateringCanRank?.toLocaleString()}`}
                type="Watering Rank"
              />
              <StatDisplay
                value={`#${cropWarsData.spores.rank.toLocaleString()}`}
                type="Seed Rank"
              />
              <StatDisplay value={`#${cropWarsData.goo.rank.toLocaleString()}`} type="Goo Rank" />
              <StatDisplay
                value={`#${cropWarsData.fert.rank.toLocaleString()}`}
                type="Fertilizer Rank"
              />
            </div>
          </>
        )}
        {page == 'stats' && (
          <>
            <h4 className="font-semibold sm:text-lg mb-0 mt-2">Skills</h4>
            <div className="w-full flex mx-auto">
              <svg className="mb-4 dark:text-white" ref={ref}></svg>
            </div>
          </>
        )}
        {page == 'nfts' && (
          <>
            <h4 className="font-semibold sm:text-lg mb-0 mt-2">Pixels NFT Avatar Collection</h4>
            <p className="text-sm mb-1">{nftCollection.length} total</p>
            <div className="flex justify-start flex-wrap">
              {nftCollection.map((nft) => (
                <div
                  key={`${nft.identifier}-${nft.collection}`}
                  className="w-1/2 sm:w-1/4 md:w-1/6 lg:w-1/8 mt-2"
                >
                  <Link href={nft.opensea_url}>
                    <Image
                      src={nft.display_image_url}
                      alt={nft.name || nft.collection}
                      className="w-24 h-24 mx-auto mb-1"
                      width={240}
                      height={96}
                    />
                  </Link>
                  <p className="text-xs text-center">{nft.name || nft.identifier}</p>
                </div>
              ))}
            </div>
            <p className="text-2xs mb-4 mt-3 leading-3 sm:leading-4">
              * This feature is in beta, DM me on X if you see any issues or missing collections.
            </p>
          </>
        )}
      </div>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const allPlayerData = (await getBlobStorageFile('pixels-data', 'playerData.json'))
    .results as PlayerData[];

  const paths = allPlayerData.map((item) => {
    return {
      params: {
        playerId: item.playerId,
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const allPlayerData = (await getBlobStorageFile('pixels-data', 'playerData.json'))
    .results as PlayerData[];

  const guildData = (await getBlobStorageFile('pixels-data', 'guildStats.json')).results as Guild[];
  const player = allPlayerData.find((item) => item.playerId === params.playerId);
  const guild = guildData.find((item) => item.value === player?.guildId);

  const guildInfo = {
    guildId: guild?.value || '',
    guildName: guild?.label || '',
    guildRank: guild?.rank || 0,
    bracket: guild?.bracket || '',
  };

  return {
    props: {
      guildInfo: guildInfo,
      playerData: player,
    },
  };
};
