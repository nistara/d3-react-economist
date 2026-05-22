import { descending, range, scaleBand, scaleLinear, sort } from 'd3'
import { data } from './chartData'

export function ChartGraphic({ config }) {
  const {
    width,
    marginTop,
    marginRight,
    marginLeft,
    barHeight,
    barPadding,
    xMax,
    tickStep,
    labelOutsideCount,
    labelOffset,
    axisExtension,
    gridLabelOffset,
  } = config

  const height = marginTop + data.length * barHeight
  const innerWidth = width - marginLeft - marginRight
  const innerHeight = height - marginTop
  const sortedData = sort(data, (a, b) => descending(a.count, b.count))
  const xTicks = range(0, xMax + tickStep, tickStep)

  const xScale = scaleLinear()
    .domain([0, xMax])
    .range([0, innerWidth])

  const yScale = scaleBand()
    .domain(sortedData.map((d) => d.name))
    .range([0, innerHeight])
    .paddingInner(barPadding)

  return (
    <svg className="bar-chart" viewBox={`0 0 ${width} ${height}`}>
      <g transform={`translate(${marginLeft}, ${marginTop})`}>
        <g className="grid-lines">
          {xTicks.map((tick) => (
            <g
              key={tick}
              className={tick === 0 ? 'zero-grid-line' : ''}
              transform={`translate(${xScale(tick)}, 0)`}
            >
              <line y1={tick === 0 ? -axisExtension : 0} y2={innerHeight + (tick === 0 ? axisExtension : 0)} />
              <text y={gridLabelOffset}>{tick}</text>
            </g>
          ))}
        </g>

        {sortedData.map((d, i) => {
          const barWidth = xScale(d.count)
          const labelOutside = i >= sortedData.length - labelOutsideCount

          return (
            <g key={d.name} transform={`translate(0, ${yScale(d.name)})`}>
              <rect className="bar" x="0" y="0" width={barWidth} height={yScale.bandwidth()} />
              <text
                className={labelOutside ? 'bar-label bar-label-outside' : 'bar-label'}
                x={labelOutside ? barWidth + labelOffset : labelOffset}
                y={yScale.bandwidth() / 2}
                dy="0.35em"
              >
                {d.name}
              </text>
            </g>
          )
        })}
      </g>
    </svg>
  )
}
