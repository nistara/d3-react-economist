export const codeSections = [
  {
    title: '1. Data and chart setup',
    code: `import { descending, range, scaleBand, scaleLinear, sort } from 'd3'

const data = [
  { count: 6, name: 'Hantavirus' },
  { count: 7, name: 'Tularemia' },
  { count: 7, name: 'Dengue' },
  { count: 9, name: 'Ebola' },
  { count: 11, name: 'E. coli' },
  { count: 15, name: 'Tuberculosis' },
  { count: 17, name: 'Salmonella' },
  { count: 18, name: 'Vaccinia' },
  { count: 54, name: 'Brucella' },
]

const width = 720
const margin = {
  top: 24,
  right: 24,
  left: 136,
}

// Grid labels run from 0 to 55 in steps of 5.
const xTicks = range(0, 56, 5)

// Put the largest value at the top.
const sortedData = sort(data, (d) => d.count, descending)`,
  },
  {
    title: '2. D3 scales',
    code: `const height = margin.top + data.length * 30
const innerWidth = width - margin.left - margin.right
const innerHeight = height - margin.top

// Count values become horizontal pixel widths.
const xScale = scaleLinear()
  .domain([0, 55])
  .range([0, innerWidth])

// Names become vertical row positions.
const yScale = scaleBand()
  .domain(sortedData.map((d) => d.name))
  .range([0, innerHeight])
  .paddingInner(0.4)`,
  },
  {
    title: '3. React renders the SVG',
    code: `<svg className="bar-chart" viewBox={\`0 0 \${width} \${height}\`}>
  <g transform={\`translate(\${margin.left}, \${margin.top})\`}>
    <g className="grid-lines">
      {xTicks.map((tick) => (
        <g
          key={tick}
          className={tick === 0 ? 'zero-grid-line' : ''}
          transform={\`translate(\${xScale(tick)}, 0)\`}
        >
          <line
            y1={tick === 0 ? -6 : 0}
            y2={innerHeight + (tick === 0 ? 6 : 0)}
          />
          <text y="-8">{tick}</text>
        </g>
      ))}
    </g>

    {sortedData.map((d, i) => {
      const barWidth = xScale(d.count)
      const labelOutside = i >= sortedData.length - 3

      return (
        <g key={d.name} transform={\`translate(0, \${yScale(d.name)})\`}>
          <rect
            className="bar"
            width={barWidth}
            height={yScale.bandwidth()}
          />
          <text
            className={labelOutside ? 'bar-label bar-label-outside' : 'bar-label'}
            x={labelOutside ? barWidth + 8 : 8}
            y={yScale.bandwidth() / 2}
            dy="0.35em"
          >
            {d.name}
          </text>
        </g>
      )
    })}
  </g>
</svg>`,
  },
  {
    title: '4. Chart styling',
    code: `.chart-page {
  --chart-left: calc(136 / 720 * 100%);
  width: min(920px, calc(100vw - 32px));
  margin: 0 auto;
  padding: 56px 0;
  font-family: Helvetica, Arial, sans-serif;
}

.chart-header {
  position: relative;
  margin-bottom: 18px;
  margin-left: var(--chart-left);
  padding-top: 1px;
}

.chart-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 91.53%;
  height: 1px;
  background: #e3120b;
}

.economist-rule {
  width: 34px;
  height: 8px;
  margin-bottom: 8px;
  background: #e3120b;
}

.bar {
  fill: #0a6ea2;
}

.bar-label {
  fill: #fff;
  font-size: 13px;
  text-anchor: start;
}

.bar-label-outside {
  fill: #075f8d;
}`,
  },
]
