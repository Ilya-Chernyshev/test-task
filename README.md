# Тестовое задание (test-task)

Данные для виджетов хранятся тут `src/constants/data.ts`

- `src/components/BaseIndicatorItem.vue` - Компонент индикатора (Полоса).
- `src/components/BaseIndicatorScaleBar.vue` - Компонент шкалы с индикаторами (Набор индикаторов с ярлыком информации).
- `src/components/BaseIndicatorWidget.vue` - Компонент виджета с заголовок. Составной с `BaseIndicatorScaleBar`.
- `src/components/IndicatorWidgets.vue` - Компонент с виджетам. Для примера выведено 4 штуки.

### Пример работы виджетов

Пример на [git pages](https://ilya-chernyshev.github.io/test-task/).

## Структура проекта
### Исходный код веб-приложения
├── src
   ##### Компоненты
|  ├── components
   ##### Константы (Вынесенные данные) 
|  ├── constants
   ##### Утилиты (Вынесенные функции)
|  ├── helpers
   ##### CSS-стили
|  ├── styles

## Команды

- `npm run serve` - запустить приложение в режиме разработки;
- `npm run build` - собрать статические файлы приложения для публикации на стенд;
- `npm run lint` - запустить линтер для поиска ошибок в коде;