import Layout from '@components/layouts/PageLayout';
import { Leaderboard } from '@components/leaderboards/Leaderboard';
import { getBlobStorageFile } from '@services/azure/blobStorage';
import { PlayerData, BazarnStats } from '@types';
import { GetStaticProps } from 'next';
// import Image from 'next/image';

export default function BazaarnBlitz({ players }: { players: BazarnStats[] }) {
  return (
    <Layout
      description="Pixels Online top 200 players from the Barneys Bazaarn Blitz event."
      title="Popberry Analytics | Pixels Online Barneys Bazaarn Blitz Leaderboard"
    >
      <h1 className="text-base mb-2">Barneys Bazaarn Blitz</h1>
      {/* <div className="float-right">
        <Image
          alt="Bazaarn Blitz"
          src="/images/Bazaarn-Blitz.png"
          height={80}
          width={160}
          style={{ marginBottom: '12px' }}
        />
      </div> */}
      <Leaderboard
        players={players.map((p) => ({
          ...p,
          name: p.name,
          scores: [p.score],
        }))}
        labels={['Score']}
      />
    </Layout>
  );
}

export const getStaticProps = (async () => {
  const allPlayerData = (await getBlobStorageFile('pixels-data', 'playerData.json'))
    .results as PlayerData[];
  const bazarnData = allPlayerData
    .filter((p) => p.individualEvents.find((e) => e.eventId == '2'))
    .map((p) => ({
      ...p.individualEvents.find((e) => e.eventId == '2'),
      playerId: p.playerId,
      name: p.name,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 500);
  return { props: { players: bazarnData } };
}) satisfies GetStaticProps<{
  players: BazarnStats[];
}>;
