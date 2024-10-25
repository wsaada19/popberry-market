import * as d3 from 'd3';

export const initRadarChart = (ref, data) => {
  const width = 400;
  const height = 400;
  const margin = 60;
  const levels = 4; // Number of concentric circles
  const maxValue = 100; // Maximum value on the chart
  const radius = Math.min(width / 2, height / 2) - margin;
  const angleSlice = (Math.PI * 2) / data.length;

  d3.select(ref.current).selectAll('*').remove();
  const svg = d3
    .select(ref.current)
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', `translate(${width / 2}, ${height / 2})`);

  // Draw concentric circles
  for (let level = 0; level <= levels; level++) {
    const r = radius * (level / levels);
    svg.append('circle').attr('r', r).attr('fill', 'none').attr('stroke', '#D3D3D3');
  }

  // Draw the axes (spokes)
  data.forEach((d, i) => {
    const angle = angleSlice * i;
    const x = radius * Math.cos(angle - Math.PI / 2);
    const y = radius * Math.sin(angle - Math.PI / 2);

    svg
      .append('line')
      .attr('x1', 0)
      .attr('y1', 0)
      .attr('x2', x)
      .attr('y2', y)
      .attr('stroke', '#D3D3D3');

    svg
      .append('text')
      .attr('x', x * 1.2)
      .attr('y', y * 1.2)
      .attr('class', 'axis-label')
      .text(`${d.axis}`);

    svg
      .append('image')
      .attr('width', 14)
      .attr('height', 14)
      .attr('x', x * 1.2 - 17)
      .attr('y', y * 1.2 + 5.5)
      .attr('xlink:href', `/skills/${d.axis.toLowerCase()}.png`);

    svg
      .append('text')
      .attr('x', x * 1.2 + 7)
      .attr('y', y * 1.2 + 16)
      .attr('class', 'axis-label')
      .text(`${d.value}`);
  });

  // Draw radar area
  const radarLine = d3
    .lineRadial()
    .radius((d) => radius * (d.value / maxValue))
    .angle((d, i) => i * angleSlice);

  svg
    .append('path')
    .datum(data)
    .attr('d', radarLine)
    .attr('fill', '#0096FF')
    .attr('class', 'radar-area')
    .attr('stroke', 'none');

  // Close the radar area
  svg
    .append('path')
    .datum([...data, data[0]]) // To close the area
    .attr('d', radarLine)
    .attr('fill', '#0096FF')
    .attr('class', 'radar-area')
    .attr('stroke', '#14376c')
    .attr('fill-opacity', 0.6);
};
