import { useState } from 'react'
import { ChartGraphic } from './ChartGraphic'
import { defaultChartConfig } from './chartConfig'
import { getChartVars } from './chartVars'
import { ChartHeader, ChartSource } from './ChartText'
import { studioCodeFiles } from './studioCodeFiles'

const textControls = [
  { key: 'title', label: 'Title', code: '<h1>{config.title}</h1>' },
  { key: 'subtitle', label: 'Subtitle', code: '<p>{config.subtitle}</p>' },
  { key: 'source', label: 'Source', code: '<p>{config.source}</p>' },
  { key: 'publisher', label: 'Publisher', code: '<p>{config.publisher}</p>' },
]

const colorControls = [
  { key: 'barColor', label: 'Bars', code: '--bar-color -> .bar { fill }' },
  { key: 'outsideLabelColor', label: 'Outside labels', code: '--outside-label-color -> .bar-label-outside { fill }' },
  { key: 'insideLabelColor', label: 'Inside labels', code: '--inside-label-color -> .bar-label { fill }' },
  { key: 'gridColor', label: 'Grid lines', code: '--grid-color -> .grid-lines line { stroke }' },
  { key: 'axisColor', label: 'Zero axis', code: '--axis-color -> .zero-grid-line line { stroke }' },
  { key: 'redColor', label: 'Red rule', code: '--red-color -> .chart-header::before, .economist-rule' },
  { key: 'sourceColor', label: 'Source', code: '--source-color -> .chart-source { color }' },
]

const numberControls = [
  { key: 'xMax', label: 'X max', min: 20, max: 80, step: 1, code: 'scaleLinear().domain([0, xMax])' },
  { key: 'tickStep', label: 'Tick step', min: 1, max: 10, step: 1, code: 'range(0, xMax + tickStep, tickStep)' },
  { key: 'barHeight', label: 'Row height', min: 18, max: 46, step: 1, code: 'height = marginTop + data.length * barHeight' },
  { key: 'barPadding', label: 'Bar gap', min: 0, max: 0.7, step: 0.05, code: 'scaleBand().paddingInner(barPadding)' },
  { key: 'marginLeft', label: 'Left margin', min: 60, max: 220, step: 1, code: '<g transform={`translate(${marginLeft}, ${marginTop})`}>' },
  { key: 'marginRight', label: 'Right margin', min: 0, max: 100, step: 1, code: 'innerWidth = width - marginLeft - marginRight' },
  { key: 'marginTop', label: 'Top margin', min: 8, max: 60, step: 1, code: '<g transform={`translate(${marginLeft}, ${marginTop})`}>' },
  { key: 'labelOutsideCount', label: 'Outside labels', min: 0, max: 9, step: 1, code: 'i >= sortedData.length - labelOutsideCount' },
  { key: 'labelOffset', label: 'Label offset', min: 0, max: 24, step: 1, code: 'x={labelOutside ? barWidth + labelOffset : labelOffset}' },
  { key: 'axisExtension', label: 'Axis extension', min: 0, max: 16, step: 1, code: 'y1={-axisExtension}; y2={innerHeight + axisExtension}' },
  { key: 'topRuleValue', label: 'Top red line', min: 0, max: 55, step: 0.5, code: 'topRuleValue / xMax -> --top-rule-width' },
  { key: 'redRuleWidth', label: 'Red block width', min: 16, max: 80, step: 1, code: '--red-rule-width -> .economist-rule { width }' },
  { key: 'redRuleHeight', label: 'Red block height', min: 2, max: 16, step: 1, code: '--red-rule-height -> .economist-rule { height }' },
  { key: 'redRuleGap', label: 'Red/title gap', min: 0, max: 24, step: 1, code: '--red-rule-gap -> .economist-rule { margin-bottom }' },
  { key: 'titleFontSize', label: 'Title size', min: 18, max: 42, step: 1, code: '--title-size -> .chart-header h1 { font-size }' },
  { key: 'subtitleFontSize', label: 'Subtitle size', min: 12, max: 28, step: 1, code: '--subtitle-size -> .chart-header p { font-size }' },
  { key: 'labelFontSize', label: 'Label size', min: 9, max: 22, step: 1, code: '--label-size -> .bar-label { font-size }' },
  { key: 'sourceFontSize', label: 'Source size', min: 9, max: 22, step: 1, code: '--source-size -> .chart-source { font-size }' },
  { key: 'gridLabelFontSize', label: 'Grid label size', min: 8, max: 18, step: 1, code: '--grid-label-size -> .grid-lines text { font-size }' },
]

export function ChartStudio() {
  const [config, setConfig] = useState(defaultChartConfig)
  const [activeCodeFile, setActiveCodeFile] = useState(studioCodeFiles[0].name)
  const selectedCodeFile = studioCodeFiles.find((file) => file.name === activeCodeFile)

  function updateConfig(key, value) {
    setConfig((current) => ({
      ...current,
      [key]: value,
    }))
  }

  return (
    <section className="studio-page">
      <aside className="studio-controls" aria-label="Chart controls">
        <ControlGroup title="Text">
          {textControls.map(({ key, label, code }) => (
            <label className="field" key={key}>
              <span>{label}</span>
              <input value={config[key]} onChange={(event) => updateConfig(key, event.target.value)} />
              <code>{code}</code>
            </label>
          ))}
        </ControlGroup>

        <ControlGroup title="Colors">
          {colorControls.map(({ key, label, code }) => (
            <label className="field color-field" key={key}>
              <span>{label}</span>
              <input type="color" value={config[key]} onChange={(event) => updateConfig(key, event.target.value)} />
              <code>{code}</code>
            </label>
          ))}
        </ControlGroup>

        <ControlGroup title="Layout">
          {numberControls.map(({ key, label, min, max, step, code }) => (
            <label className="field range-field" key={key}>
              <span>{label}</span>
              <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={config[key]}
                onChange={(event) => updateConfig(key, Number(event.target.value))}
              />
              <output>{config[key]}</output>
              <code>{code}</code>
            </label>
          ))}
        </ControlGroup>

        <button className="reset-button" type="button" onClick={() => setConfig(defaultChartConfig)}>
          Reset
        </button>
      </aside>

      <div className="studio-preview">
        <section className="chart-page" style={getChartVars(config)}>
          <ChartHeader config={config} />
          <ChartGraphic config={config} />
          <ChartSource config={config} />
        </section>

        <section className="studio-code">
          <h2>Studio code</h2>
          <div className="file-tabs" role="tablist" aria-label="Studio code files">
            {studioCodeFiles.map((file) => (
              <button
                aria-selected={file.name === activeCodeFile}
                className={file.name === activeCodeFile ? 'active-file-tab' : ''}
                key={file.name}
                role="tab"
                type="button"
                onClick={() => setActiveCodeFile(file.name)}
              >
                {file.name}
              </button>
            ))}
          </div>
          <pre>
            <code>{selectedCodeFile.code}</code>
          </pre>
        </section>
      </div>
    </section>
  )
}

function ControlGroup({ title, children }) {
  return (
    <fieldset className="control-group">
      <legend>{title}</legend>
      {children}
    </fieldset>
  )
}
