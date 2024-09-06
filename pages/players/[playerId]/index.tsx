import Layout from '@components/layouts/PageLayout';
import { GetStaticPaths, GetStaticProps } from 'next';
import data from '@components/d3/guildWarsData.json';
import { Player } from '@types';
import { StatDisplay } from '@components/StatDisplay';

type PlayerPageProps = {
  playerData: Player;
  playerId: string;
};
export default function PlayerPage({ playerData }: PlayerPageProps) {
  return (
    <Layout description={`Pixels event statistics for ${playerData.name}`} title="Guild War">
      <div>
        <h1 className="mb-2">Player Data</h1>
        <h3>{playerData.name}</h3>
        <h5 className="mt-3">Pixels Crop Wars 1</h5>
        <div className="p-3 bg-blue-600 shadow-2xl text-white grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatDisplay value={playerData.total.value.toLocaleString()} type="Points scored" />
          <StatDisplay value={`#${playerData.total.rank}`} type="Total rank" />
          <StatDisplay value={playerData.pixelsSpent.toLocaleString()} type="Pixels spent" />
          <StatDisplay value={playerData.totalCost.toLocaleString()} type="Coins spent" />
          <StatDisplay
            value={Number(playerData.wateringCanUse).toLocaleString()}
            type="Watering Can use"
          />
          <StatDisplay value={playerData.spores.value.toLocaleString()} type="Seed Points" />
          <StatDisplay value={playerData.goo.value.toLocaleString()} type="Goo Points" />
          <StatDisplay value={playerData.fert.value.toLocaleString()} type="Fertilizer Points" />
        </div>
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
  return {
    props: {
      playerId: params.playerId,
      playerData: playerData,
    },
  };
};
