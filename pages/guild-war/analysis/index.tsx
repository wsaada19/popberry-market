import { addGuildPlot } from '@components/d3/guildAnalysis';
import guildData from '@components/d3/guildStats.json';
import { useEffect, useRef } from 'react';
import Layout from '@components/layouts/PageLayout';

export default function GuildWarAnalysis() {
  const ref = useRef(null);
  useEffect(() => {
    // @ts-ignore relax
    addGuildPlot(guildData, ref);
  }, []);
  return (
    <Layout description="Top Players for different tasks" title="Pixels Guild War">
      <div>
        <h1>Guild War Analysis</h1>
        <div className="mt-4 mb-4" ref={ref}></div>
      </div>
    </Layout>
  );
}
