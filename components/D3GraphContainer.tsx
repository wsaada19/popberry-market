import React, { useEffect, useRef } from 'react';
import { addPixelsPlot } from './d3/pixelsGuildWar';

export type D3GraphContainerProps = {
  graphId: string;
  data?: any[];
};

export const D3GraphContainer = ({ graphId, data = [] }: D3GraphContainerProps) => {
  const ref = useRef(null);
  useEffect(() => {
    getGraphById(graphId, ref, data);
  }, [ref, graphId, data]);
  return <div className="my-2" ref={ref}></div>;
};

const getGraphById = (id: string, ref: React.RefObject<HTMLDivElement>, data?: any): void => {
  addPixelsPlot(data, ref);
};
