// https://pixels-server.pixels.xyz/cache/leaderboard/ldb_halloween_2024?
import Layout from '@components/layouts/PageLayout';
import { Leaderboard } from '@components/leaderboards/Leaderboard';
import { GetStaticProps } from 'next';
import Image from 'next/image';

type HalloweenData = {
  player: { _id: string; username: string };
  value: number;
};

export default function HalloweenEvent({ players }: { players: HalloweenData[] }) {
  return (
    <Layout
      description="Pixels Online top 1000 players in the 2024 Halloween Event."
      title="Popberry Analytics | Pixels Online Halloween Leaderboard"
    >
      <h1 className="text-base mb-2">
        <span>
          <Image
            style={{ display: 'inline-block' }}
            src="/images/tooth.png"
            height={24}
            width={24}
            alt="Tooth"
          />
        </span>
        <span> Most teeth collected</span>
      </h1>
      <Leaderboard
        players={players.map((p) => ({
          playerId: p.player._id,
          name: p.player.username,
          scores: [p.value],
        }))}
        labels={['Teeth']}
      />
    </Layout>
  );
}

export const getStaticProps = (async () => {
  const halloweenLeaderboard = await (
    await fetch('https://pixels-server.pixels.xyz/cache/leaderboard/ldb_halloween_2024?')
  ).json();
  const halloweenData = halloweenLeaderboard.playersDescending as HalloweenData[];
  return { props: { players: halloweenData.slice(0, 1000) } };
}) satisfies GetStaticProps<{
  players: HalloweenData[];
}>;
