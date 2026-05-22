export function ChartHeader({ config }) {
  return (
    <header className="chart-header">
      <div className="economist-rule" />
      <h1>{config.title}</h1>
      <p>{config.subtitle}</p>
    </header>
  )
}

export function ChartSource({ config }) {
  return (
    <footer className="chart-source">
      <p>{config.source}</p>
      <p>{config.publisher}</p>
    </footer>
  )
}
