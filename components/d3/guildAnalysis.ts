const MARGIN = { LEFT: 90, RIGHT: 50, TOP: 20, BOTTOM: 70 };
const WIDTH = 650 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 375 - MARGIN.TOP - MARGIN.BOTTOM;

import * as d3 from 'd3';

type Guild = {
  value: string;
  label: string;
  emblem: string;
  score: number;
  totalRank: number;
  earnings: number;
  bracket: string;
  rank: number;
  stats: {
    t1Seeds: number;
    t2Seeds: number;
    t3Seeds: number;
    t1Goo: number;
    t2Goo: number;
    t3Goo: number;
    t1Fert: number;
    t2Fert: number;
    t3Fert: number;
    wateringCanUse: number;
    pixelsSpent: number;
    coinsSpent: number;
  };
};

export function addGuildPlot(data: Guild[], ref: React.RefObject<HTMLDivElement>) {
  d3.select('#guild-graph').remove();
  d3.select('#select-box').remove();
  const width = WIDTH + MARGIN.LEFT + MARGIN.RIGHT;
  const height = HEIGHT + MARGIN.TOP + MARGIN.BOTTOM;
  const svg = d3
    .select(ref.current)
    .append('svg')
    .attr('id', 'guild-graph')
    .attr('viewBox', `0 0 ${width} ${height}`)
    .attr('preserveAspectRatio', 'xMinYMin meet')
    .style('background-color', '#fff')
    .style('color', '#000');
  const g = svg.append('g').attr('transform', `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`);

  const tooltip = d3
    .select(ref.current)
    .append('div')
    .attr('class', 'tooltip')
    .style('opacity', '0');

  // Y label
  g.append('text')
    .attr('class', 'y-axis-label')
    .attr('x', -(HEIGHT / 2))
    .attr('y', -70)
    .attr('font-size', '12px')
    .attr('text-anchor', 'middle')
    .attr('transform', 'rotate(-90)')
    .text('Spores Planted');

  // X label
  g.append('text')
    .attr('class', 'x axis-label')
    .attr('x', WIDTH / 2)
    .attr('y', HEIGHT - 25)
    .attr('font-size', '12px')
    .attr('text-anchor', 'middle')
    .text('Rank');

  const x = d3.scaleLinear().range([0, WIDTH]);

  const y = d3.scaleLinear().range([HEIGHT, 0]);

  const xAxisGroup = g
    .append('g')
    .attr('class', 'x axis')
    .attr('transform', `translate(0, ${HEIGHT})`);

  const yAxisGroup = g.append('g').attr('class', 'y axis');

  const filter = data.filter((d) => d.score >= 1000);

  update(filter);

  function update(data: Guild[]) {
    g.selectAll('circle').remove();
    const getRank = (d: Guild) => d.score;
    const getValue = (d: Guild) => d.stats.wateringCanUse;

    data = data.filter((d) => getValue(d) > 0);

    // change the y-axis-label to have the title
    g.select('.y-axis-label').text('Spores Planted');

    let yMin = d3.min(data, (d) => getValue(d)) - 100;
    if (yMin <= 0) {
      yMin = 1;
    }
    x.domain([1, d3.max(data, (d) => getRank(d)) + 1]);
    y.domain([yMin, d3.max(data, (d) => getValue(d)) + 500]);

    const xAxisCall = d3.axisBottom(x).ticks(5);
    xAxisGroup
      .call(xAxisCall)
      .selectAll('text')
      .attr('y', '10')
      .attr('x', '-5')
      .attr('text-anchor', 'end')
      .attr('transform', 'rotate(-45)');

    const yAxisCall = d3.axisLeft(y).ticks(5);
    yAxisGroup.call(yAxisCall);

    // ENTER new elements present in new data...
    const rects = g.selectAll('circle').data(data);

    rects
      .enter()
      .append('circle')
      .attr('cx', function (d: Guild) {
        return x(getRank(d));
      })
      .attr('cy', function (d: Guild) {
        return y(getValue(d));
      })
      .attr('r', 3.2)
      .attr('fill', '#1c4d97')
      .on('mouseover', function (event, d: Guild) {
        tooltip.html(() => {
          let html = `<p class="title"><strong>${d.label}</strong></p>`;
          html += `<p><strong>Total Rank #${d.totalRank}</strong></p>`;
          html += `<p><strong>Score ${getRank(d).toLocaleString()}</strong></p>`;
          html += `<p><strong>${getValue(d).toLocaleString()}</strong></p>`;
          return html;
        });
        tooltip
          .style('top', event.pageY - 48 + 'px')
          .style('left', event.pageX + 10 + 'px')
          .style('background', '#1c4d97')
          .transition()
          .duration(200)
          .style('opacity', 0.9);
      })
      .on('mouseout', function () {
        tooltip.transition().duration(200).style('opacity', 0);
      });
  }
}
