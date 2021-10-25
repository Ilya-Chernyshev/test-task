import { IndicatorsWidgets, Indicator } from '@/types/Indicator';

export default function getDataIndicatorsInPercent(dataWidgets: IndicatorsWidgets): Indicator[] {
  let amount = 0;

  dataWidgets.indicatorsWidgets.forEach((item) => {
    amount += item.value;
  });

  const percent = amount / 100;

  return dataWidgets.indicatorsWidgets.map((item) => ({
    color: item.color,
    description: `${item.value} ${dataWidgets.indicatorValueName}`,
    value: item.valueName,
    width: `${(item.value / percent).toFixed(2)}%`,
  }));
}
