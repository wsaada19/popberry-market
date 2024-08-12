const MARGIN = { LEFT: 80, RIGHT: 50, TOP: 20, BOTTOM: 70 };
const WIDTH = 650 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 375 - MARGIN.TOP - MARGIN.BOTTOM;

import * as d3 from 'd3';

type Player = {
  guildId: string;
  totalRank?: number;
  name: string;
  id: string;
  fert: {
    value: number;
    rank: number;
  };
  goo: {
    value: number;
    rank: number;
  };
  spores: {
    value: number;
    rank: number;
  };
  total: {
    averageRank: number;
    value: number;
  };
};

export function addPixelsPlot(
  data: Player[],
  ref: React.RefObject<HTMLDivElement>,
  guildId: string,
  type = 'spores'
) {
  d3.select('#spores-graph').remove();
  d3.select('#select-box').remove();
  const width = WIDTH + MARGIN.LEFT + MARGIN.RIGHT;
  const height = HEIGHT + MARGIN.TOP + MARGIN.BOTTOM;
  const svg = d3
    .select(ref.current)
    .append('svg')
    .attr('id', 'spores-graph')
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
    .attr('y', -50)
    .attr('font-size', '12px')
    .attr('text-anchor', 'middle')
    .attr('transform', 'rotate(-90)')
    .text('Spores Planted');

  // X label
  g.append('text')
    .attr('class', 'x axis-label')
    .attr('x', WIDTH / 2)
    .attr('y', HEIGHT + 55)
    .attr('font-size', '12px')
    .attr('text-anchor', 'middle')
    .text('Rank');

  const x = d3.scaleLinear().range([0, WIDTH]);

  const y = d3.scaleLog().range([HEIGHT, 0]);

  const xAxisGroup = g
    .append('g')
    .attr('class', 'x axis')
    .attr('transform', `translate(0, ${HEIGHT})`);

  const yAxisGroup = g.append('g').attr('class', 'y axis');

  const filter = data
    .map((d, i) => {
      return { ...d, totalRank: i };
    })
    .filter((d) => d.guildId == guildId);

  update(filter);

  function update(data: Player[]) {
    g.selectAll('circle').remove();
    let getRank = (d: Player) => d.spores.rank;
    let getValue = (d: Player) => d.spores.value;
    let title = 'Spores';
    if (type === 'guano') {
      getRank = (d: Player) => d.fert.rank;
      getValue = (d: Player) => d.fert.value;
      title = 'Guano';
    } else if (type === 'goo') {
      getRank = (d: Player) => d.goo.rank;
      getValue = (d: Player) => d.goo.value;
      title = 'Goo';
    } else if (type === 'total') {
      getRank = (d: Player) => d.totalRank;
      getValue = (d: Player) => d.total.value;
      title = 'Total Spores, Guano, Goo Used';
    }

    data = data.filter((d) => getValue(d) > 0);

    // change the y-axis-label to have the title
    g.select('.y-axis-label').text(title);

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
      .attr('cx', function (d: Player) {
        return x(getRank(d));
      })
      .attr('cy', function (d: Player) {
        return y(getValue(d));
      })
      .attr('r', 3)
      .attr('fill', '#5936DE')
      .on('mouseover', function (event, d: Player) {
        tooltip.html(() => {
          let html = `<p class="title"><strong>${d.name}</strong></p>`;
          html += `<p><strong># ${getRank(d).toLocaleString()}</strong></p>`;
          html += `<p><strong>${getValue(d).toLocaleString()}</strong> ${title}</p>`;
          return html;
        });
        tooltip
          .style('top', event.pageY - 48 + 'px')
          .style('left', event.pageX + 10 + 'px')
          .style('background', '#5936DE')
          .transition()
          .duration(200)
          .style('opacity', 0.9);
      })
      .on('mouseout', function () {
        tooltip.transition().duration(200).style('opacity', 0);
      });
  }
}
