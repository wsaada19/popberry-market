import Layout from '@components/layouts/PageLayout';
import { GetStaticPaths, GetStaticProps } from 'next';
import data from '@components/d3/guildWarsData.json';
import guildData from '@components/guildData.json';
import { Player, BazarnStats } from '@types';
import { StatDisplay } from '@components/StatDisplay';
import bazarnData from '@components/d3/bazarnPoints.json';
// import { TriStatDisplay } from '@components/TriStatDisplay';

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
  bStats: BazarnStats;
};
export default function PlayerPage({ playerData, guildInfo, bStats, name }: PlayerPageProps) {
  return (
    <Layout
      description={`Pixels event statistics for ${name}`}
      title="Pixels Guild War | Player Statistics"
    >
      <div>
        <h1 className="text-xl text-center text-blue-800 mb-2">{name}</h1>
        {bStats.value > 0 && (
          <>
            <h5 className="font-semibold sm:text-lg">Barney&apos;s Bazaarn Blitz</h5>
            <div className="mb-1 px-1 py-3 bg-blue-600 text-white grid grid-cols-2 md:grid-cols-4 gap-2">
              <StatDisplay value={`#${bStats.rank}`} type="Rank" />
              <StatDisplay value={bStats.value.toLocaleString()} type="Points" />
              <StatDisplay
                value={(bStats.value * 2194).toLocaleString()}
                type="Cost estimate*"
                icon="coin"
              />
              <StatDisplay
                value={bStats.reward.toLocaleString()}
                type="Earnings"
                icon="pixel"
                tooltip={`$${Number((bStats.reward * 0.1436).toFixed(2)).toLocaleString()} USD`}
              />
            </div>
            <p className="text-xs mb-4">
              * The cost estimate is based on average event prices, assuming each point cost around
              2,194 coins.
            </p>
          </>
        )}
        {playerData.total && playerData.total.value > 0 && (
          <>
            <h5 className="mt-3 font-semibold sm:text-lg">Pixels Crop Wars</h5>
            {guildInfo?.guildName.length > 0 && (
              <div className="flex justify-between">
                <p className="text-xs sm:text-sm">
                  Guild: <strong>{guildInfo.guildName}</strong>
                </p>
                <p className="text-xs sm:text-sm">
                  <strong>#{guildInfo.guildRank}</strong> in the{' '}
                  <strong>{guildInfo.bracket}</strong> bracket
                </p>
              </div>
            )}
            <div className="mt-1 mb-4 py-3 bg-blue-600 text-white grid grid-cols-2 md:grid-cols-4 gap-3">
              <StatDisplay value={playerData.total.value.toLocaleString()} type="Points" />
              <StatDisplay value={`#${playerData.total.rank}`} type="Overall rank" />
              <StatDisplay
                value={playerData.pixelsSpent.toLocaleString()}
                type="Pixels burned"
                icon="pixel"
              />
              <StatDisplay
                value={playerData.totalCost.toLocaleString()}
                type="Coins spent"
                icon="coin"
              />
              <StatDisplay
                value={Number(playerData.wateringCanUse).toLocaleString()}
                type="Plants watered"
              />
              <StatDisplay value={playerData.spores.value.toLocaleString()} type="Seeds" />
              <StatDisplay value={playerData.goo.value.toLocaleString()} type="Goo" />
              <StatDisplay value={playerData.fert.value.toLocaleString()} type="Fert" />
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
              {/* <TriStatDisplay
                type="Watering"
                value={`${Number(playerData.wateringCanUse).toLocaleString()}`}
                rank={playerData.wateringCanRank.toLocaleString()}
              />
              <TriStatDisplay
                type="Seeds"
                value={`${playerData.spores.value.toLocaleString()}`}
                rank={playerData.spores.rank.toLocaleString()}
              />
              <TriStatDisplay
                type="Goo"
                value={`${playerData.goo.value.toLocaleString()}`}
                rank={playerData.goo.rank.toLocaleString()}
              />
              <TriStatDisplay
                type="Fert"
                value={`${playerData.fert.value.toLocaleString()}`}
                rank={playerData.fert.rank.toLocaleString()}
              /> */}
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

const getReward = (rank: number) => {
  if (rank == 1) {
    return 30000;
  } else if (rank == 2) {
    return 9600;
  } else if (rank == 3) {
    return 7200;
  } else if (rank == 4) {
    return 4800;
  } else if (rank == 5) {
    return 3600;
  } else if (rank == 6) {
    return 1800;
  } else if (rank == 7) {
    return 1680;
  } else if (rank == 8) {
    return 1560;
  } else if (rank == 9) {
    return 1440;
  } else if (rank == 10) {
    return 1320;
  } else if (rank <= 20) {
    return 960;
  } else if (rank <= 99) {
    return 384;
  } else if (rank <= 499) {
    return 192;
  } else if (rank <= 999) {
    return 144;
  } else if (rank <= 1999) {
    return 60;
  } else if (rank <= 5000) {
    return 48;
  } else {
    return 0;
  }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  let playerData: Player = data.find((item) => item.id === params.playerId);
  const guild = guildData.find((item) => item.value === playerData?.guildId);
  let bStats = bazarnData.playersDescending.find((item) => item.player['_id'] === params.playerId);
  const rank =
    bazarnData.playersDescending.findIndex((item) => item.player['_id'] === params.playerId) + 1;

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
      bStats: { ...bStats, rank: rank, reward: getReward(rank) },
    },
  };
};
