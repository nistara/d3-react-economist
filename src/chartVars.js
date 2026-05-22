export function getChartVars(config) {
  const plotWidth = config.width - config.marginLeft - config.marginRight
  const headerWidth = config.width - config.marginLeft
  const topRuleWidth = (plotWidth * (config.topRuleValue / config.xMax) / headerWidth) * 100

  return {
    '--chart-left': `calc(${config.marginLeft} / ${config.width} * 100%)`,
    '--top-rule-width': `${topRuleWidth}%`,
    '--red-rule-width': `${config.redRuleWidth}px`,
    '--red-rule-height': `${config.redRuleHeight}px`,
    '--red-rule-gap': `${config.redRuleGap}px`,
    '--title-size': `${config.titleFontSize}px`,
    '--subtitle-size': `${config.subtitleFontSize}px`,
    '--source-size': `${config.sourceFontSize}px`,
    '--label-size': `${config.labelFontSize}px`,
    '--grid-label-size': `${config.gridLabelFontSize}px`,
    '--bar-color': config.barColor,
    '--outside-label-color': config.outsideLabelColor,
    '--inside-label-color': config.insideLabelColor,
    '--source-color': config.sourceColor,
    '--grid-color': config.gridColor,
    '--grid-label-color': config.gridLabelColor,
    '--axis-color': config.axisColor,
    '--red-color': config.redColor,
  }
}
