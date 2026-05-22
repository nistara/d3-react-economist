import { descending, range, scaleBand, scaleLinear, sort } from 'd3'
import { codeSections } from './codeSections'
import './App.css'

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
const xTicks = range(0, 56, 5)
const sortedData = sort(data, (d) => d.count, descending)

function App() {
  const height = margin.top + data.length * 30
  const innerWidth = width - margin.left - margin.right
  const innerHeight = height - margin.top

  const xScale = scaleLinear()
    .domain([0, 55])
    .range([0, innerWidth])

  const yScale = scaleBand()
    .domain(sortedData.map((d) => d.name))
    .range([0, innerHeight])
    .paddingInner(0.4)

  return (
    <main className="chart-page">
      <header className="chart-header">
        <div className="economist-rule" />
        <h1>Escape artists</h1>
        <p>Number of laboratory-acquired infections, 1970-2021</p>
      </header>

      <svg
        className="bar-chart"
        viewBox={`0 0 ${width} ${height}`}
      >
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          <g className="grid-lines">
            {xTicks.map((tick) => (
              <g
                key={tick}
                className={tick === 0 ? 'zero-grid-line' : ''}
                transform={`translate(${xScale(tick)}, 0)`}
              >
                <line y1={tick === 0 ? -6 : 0} y2={innerHeight + (tick === 0 ? 6 : 0)} />
                <text y="-8">{tick}</text>
              </g>
            ))}
          </g>

          {sortedData.map((d, i) => {
            const barWidth = xScale(d.count)
            const labelOutside = i >= sortedData.length - 3

            return (
              <g key={d.name} transform={`translate(0, ${yScale(d.name)})`}>
                <rect
                  className="bar"
                  x="0"
                  y="0"
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
      </svg>

      <footer className="chart-source">
        <p>Sources: Laboratory-Acquired Infection Database; American Biological Safety Association</p>
        <p>The Economist</p>
      </footer>

      <section className="code-notes">
        <h2>How this chart is made</h2>
        {codeSections.map((section) => (
          <article key={section.title}>
            <h3>{section.title}</h3>
            <pre>
              <code>{section.code}</code>
            </pre>
          </article>
        ))}
      </section>
    </main>
  )
}

export default App
