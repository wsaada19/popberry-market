import Layout from '@components/layouts/PageLayout';
import { GetStaticPaths, GetStaticProps } from 'next';
import data from '@components/d3/guildWarsData.json';
import guildData from '@components/guildData.json';
import { Player } from '@types';
import { StatDisplay } from '@components/StatDisplay';
import Link from 'next/link';

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
};
export default function PlayerPage({ playerData, guildInfo }: PlayerPageProps) {
  return (
    <Layout description={`Pixels event statistics for ${playerData.name}`} title="Pixels Guild War">
      <div>
        <Link className="text-xs -mt-1 inline-block float-left pt-3" href="/players">
          Back to search
        </Link>
        <h1 className="text-xl text-center">{`${playerData.name}`}</h1>
        <h5 className="mt-3 mb-1 font-semibold">Pixels Crop Wars - August 2024</h5>
        {guildInfo?.guildName.length > 0 && (
          <p>
            Competed for the <strong>{guildInfo.guildName} Guild</strong> which ranked{' '}
            <strong>#{guildInfo.guildRank}</strong> in the <strong>{guildInfo.bracket}</strong>{' '}
            bracket.
          </p>
        )}
        <div className="my-2 p-3 bg-blue-600 shadow-2xl text-white grid grid-cols-2 md:grid-cols-4 gap-4">
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
          <StatDisplay value={playerData.fert.value.toLocaleString()} type="Fertilizer Points" />
          <StatDisplay
            value={`#${playerData.wateringCanRank?.toLocaleString()}`}
            type="Watering Rank"
          />
          <StatDisplay value={`#${playerData.spores.rank.toLocaleString()}`} type="Seed Rank" />
          <StatDisplay value={`#${playerData.goo.rank.toLocaleString()}`} type="Goo Rank" />
          <StatDisplay value={`#${playerData.fert.rank.toLocaleString()}`} type="Fertilizer Rank" />
        </div>
        <h5 className="mt-4 mb-1 font-semibold">Barney&apos;s Bazaarn Blitz - September 2024</h5>
        <p className="text-sm text-blue-800 mb-36 dark:text-white">Coming soon...</p>
      </div>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = data.map((item) => {
    return {
      params: {
        playerId: item.id,
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const playerData: Player = data.find((item) => item.id === params.playerId);
  const guild = guildData.find((item) => item.value === playerData.guildId);
  const guildInfo = {
    guildId: guild?.value || '',
    guildName: guild?.label || '',
    guildRank: guild?.rank || 0,
    bracket: guild?.bracket || '',
  };
  return {
    props: {
      playerId: params.playerId,
      guildInfo: guildInfo,
      playerData: playerData,
    },
  };
};
