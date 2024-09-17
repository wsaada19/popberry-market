import Layout from '@components/layouts/PageLayout';
import { GetStaticPaths, GetStaticProps } from 'next';
import data from '@components/d3/guildWarsData.json';
import guildData from '@components/guildData.json';
import { Player } from '@types';
import { StatDisplay } from '@components/StatDisplay';
import Link from 'next/link';
import bazarnData from '@components/d3/bazarnPoints.json';

type GuildInfo = {
  guildId: string;
  guildName: string;
  guildRank: number;
  bracket: string;
};

type PlayerPageProps = {
  playerData: Player;
  guildInfo: GuildInfo;
  playerId: string;
  name: string;
  bStats: { player: { _id: string; username: string }; value: number; rank: number };
};
export default function PlayerPage({ playerData, guildInfo, bStats, name }: PlayerPageProps) {
  return (
    <Layout description={`Pixels event statistics for ${name}`} title="Pixels Guild War">
      <div>
        <Link className="text-xs" href="/players">
          Back to search
        </Link>
        <h1 className="text-xl text-center">{`${name}`}</h1>
        {bStats.value > 0 && (
          <>
            <h5 className="mt-4 mb-1 font-semibold">
              Barney&apos;s Bazaarn Blitz - September 2024
            </h5>
            <div className="mb-2 p-3 bg-blue-600 shadow-2xl text-white grid grid-cols-2 md:grid-cols-3 gap-4">
              <StatDisplay value={`#${bStats.rank}`} type="Rank" />
              <StatDisplay value={bStats.value.toLocaleString()} type="Points" />
              <StatDisplay value={(bStats.value * 2194).toLocaleString()} type="Cost estimate*" />
            </div>
            <p className="text-xs mb-4">
              * Cost estimate is based on price averages during the event and assumes that the
              average point cost approximately 2,194 coins.
            </p>
          </>
        )}
        {playerData.total && playerData.total.value > 0 && (
          <>
            <h5 className="mt-3 mb-1 font-semibold">Pixels Crop Wars - August 2024</h5>
            {guildInfo?.guildName.length > 0 && (
              <p>
                Competed for the <strong>{guildInfo.guildName} Guild</strong> which ranked{' '}
                <strong>#{guildInfo.guildRank}</strong> in the {guildInfo.bracket.toLowerCase()}{' '}
                bracket.
              </p>
            )}
            <div className="mt-2 mb-4 p-3 bg-blue-600 shadow-2xl text-white grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatDisplay value={playerData.total.value.toLocaleString()} type="Points scored" />
              <StatDisplay value={`#${playerData.total.rank}`} type="Total rank" />
              <StatDisplay value={playerData.pixelsSpent.toLocaleString()} type="Pixels spent" />
              <StatDisplay value={playerData.totalCost.toLocaleString()} type="Coins spent" />
              <StatDisplay
                value={Number(playerData.wateringCanUse).toLocaleString()}
                type="Plants watered"
              />
              <StatDisplay value={playerData.spores.value.toLocaleString()} type="Seed Points" />
              <StatDisplay value={playerData.goo.value.toLocaleString()} type="Goo Points" />
              <StatDisplay
                value={playerData.fert.value.toLocaleString()}
                type="Fertilizer Points"
              />
              <StatDisplay
                value={`#${playerData.wateringCanRank?.toLocaleString()}`}
                type="Watering Rank"
              />
              <StatDisplay value={`#${playerData.spores.rank.toLocaleString()}`} type="Seed Rank" />
              <StatDisplay value={`#${playerData.goo.rank.toLocaleString()}`} type="Goo Rank" />
              <StatDisplay
                value={`#${playerData.fert.rank.toLocaleString()}`}
                type="Fertilizer Rank"
              />
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const combinedIds = [
    ...data.map((item) => item.id),
    ...bazarnData.playersDescending.map((item) => item.player['_id']),
  ];
  const uniqueIds = [...new Set(combinedIds)];
  const paths = uniqueIds.map((item) => {
    return {
      params: {
        playerId: item,
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  let playerData: Player = data.find((item) => item.id === params.playerId);
  const guild = guildData.find((item) => item.value === playerData?.guildId);
  let bStats = bazarnData.playersDescending.find((item) => item.player['_id'] === params.playerId);
  const rank = bazarnData.playersDescending.findIndex(
    (item) => item.player['_id'] === params.playerId
  );

  let playerName = playerData?.name;

  if (bStats?.player?.username !== undefined) {
    playerName = bStats.player.username;
  }

  if (!bStats) {
    bStats = {
      player: {
        _id: '',
        username: '',
      },
      value: 0,
    };
  }
  const guildInfo = {
    guildId: guild?.value || '',
    guildName: guild?.label || '',
    guildRank: guild?.rank || 0,
    bracket: guild?.bracket || '',
  };

  if (!playerData) {
    // @ts-ignore leave it
    playerData = {
      name: bStats.player.username,
      total: { value: 0, rank: 0 },
    };
  }
  return {
    props: {
      playerId: params.playerId,
      name: playerName,
      guildInfo: guildInfo,
      playerData: playerData,
      bStats: { ...bStats, rank: rank + 1 },
    },
  };
};
