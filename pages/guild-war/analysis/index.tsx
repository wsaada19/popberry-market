import { addGuildPlot } from '@components/d3/guildAnalysis';
import { useEffect, useRef } from 'react';
import Layout from '@components/layouts/PageLayout';
import { Guild } from '@types';
import { getBlobStorageFile } from '@services/azure/blobStorage';

export default function GuildWarAnalysis({ guildData }: { guildData: Guild[] }) {
  const ref = useRef(null);
  useEffect(() => {
    // @ts-ignore relax
    addGuildPlot(guildData, ref);
  }, []);
  return (
    <Layout
      description="Top Players for different tasks"
      title="Popberry Analytics | Event Rankings and Statistics"
    >
      <div>
        <h1 className="text-lg">Guild War Analysis</h1>
        <div className="mt-2 mb-4" ref={ref}></div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const guildStats = (await getBlobStorageFile('pixels-data', 'guildStats.json'))
    .results as Guild[];
  return {
    props: { guildData: guildStats },
  };
}
