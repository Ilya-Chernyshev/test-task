/**
 * Метод для получения данных в процентах для индикаторов.
 * 
 * @param {Object} dataWidgets - Данные виджета.
 * @param {number} [fractionDigits = 2] - Количество цифр после десятичной запятой.
 * 
 * @param {string} dataWidgets.indicatorTitle - Наименование индикатора (К примеру employees).
 * @param {Array.<{prevailingMessage: string, value: number, title: string, color: string}>} dataWidgets.indicatorsWidgets - Информация о индикаторах.
 * @param {string} dataWidgets.indicatorsWidgets[].prevailingMessage - Заголовок преобладающего индикатора.
 * @param {number} dataWidgets.indicatorsWidgets[].value - Значение индикатора (На основании этого значения вычисляется ширина 1-го индикатора в виджете).
 * @param {string} dataWidgets.indicatorsWidgets[].title - Заголовок в ярлыке шкалы с индикаторами.
 * @param {string} dataWidgets.indicatorsWidgets[].color - Цвет индикатора.
 * 
 * @returns {Array.<{ width: string | number, color: string, value: string, description: string}>} - Данные для формирования индикаторов в шкале с шириной в процентах.
 */
export default function getDataIndicatorsInPercent(dataWidgets, fractionDigits = 2) {
  let amount = 0;

  dataWidgets.indicatorsWidgets.forEach((item) => {
    amount += item.value;
  });

  const percent = amount / 100;

  return dataWidgets.indicatorsWidgets.map((item) => ({
    color: item.color,
    description: `${item.value} ${dataWidgets.indicatorTitle}`,
    value: item.title,
    width: `${(item.value / percent).toFixed(fractionDigits)}%`,
  }));
}
