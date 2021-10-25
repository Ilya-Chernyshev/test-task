export type Indicator = {
  width: string | number;
  color: string;
  value: string;
  description: string;
}

export type IndicatorWidget = {
  prevailingMessage: string,
  value: number,
  valueName: string,
  color: string,
}

export type IndicatorsWidgets = {
  indicatorValueName: string,
  indicatorsWidgets: IndicatorWidget[],
}
