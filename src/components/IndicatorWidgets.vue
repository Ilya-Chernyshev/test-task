<template>
  <div class="indicators-widgets" :class="hover">
    <!-- Список виджетов -->
    <div class="indicators-widgets__list">
      <template v-for="(widget, index) in widgets">
        <BaseIndicatorWidget
          @indicator-update="onIndicatorUpdate"
          :data="getDataIndicatorsInPercent(widget)"
          :title="getPrevailingTitle(widget)"
          :key="`widget_${index}`"
        />
      </template>
    </div>
  </div>
</template>

<script>
/** Компоненты */
import BaseIndicatorWidget from "@/components/BaseIndicatorWidget.vue";

/** Утилиты */
import getDataIndicatorsInPercent from "@/helpers/getDataIndicatorsInPercent";

/** Данные */
import widgetsData from "@/constants/data";

export default {
  components: {
    BaseIndicatorWidget,
  },

  /* --- DATA --- */

  data() {
    return {
      /** css-класс при наведении на индикатор в виджетах.  */
      hover: {},

      /** Данные для виджетов. */
      widgets: widgetsData,
    };
  },

  /* --- METHODS --- */

  methods: {
    /**
     * Метод для получения данных в процентах.
     * Необходим для корректного отображения индикаторов в шкале с виджетами.
     * jsDoc типы данных описаны в самой функции.
     */
    getDataIndicatorsInPercent: getDataIndicatorsInPercent,

    /**
     * Обработчик события изменения активного индикатора в виджетах.
     *
     * @param {number | null} index - Индекс активного индикатора.
     */
    onIndicatorUpdate(index) {
      this.hover = { hover: index !== null };
    },

    /**
     * Метод получения заголовка для виджета.
     * Отдает заголовок виджета на основании преобладающего кол-во данных.
     * Если все данные одинаковые - вернет первый.
     * Входной тип данных более подробно описан в getDataIndicatorsInPercent.js.
     *
     * @param {Object} dataWidgets - Данные виджета.
     * @param {string} dataWidgets.indicatorTitle - Наименование индикатора (К примеру employees).
     * @param {Array.<{prevailingMessage: string, value: number, title: string, color: string}>} dataWidgets.indicatorsWidgets - Информация о индикаторах.
     * @returns {string} - Заголовок виджета.
     */
    getPrevailingTitle(dataWidgets) {
      let max = dataWidgets.indicatorsWidgets[0] || {
        value: 0,
        prevailingMessage: "",
      };

      // TODO - Можно оптимизировать обход выделением данных в объект.
      dataWidgets.indicatorsWidgets.forEach((item) => {
        if (max.value < item.value) {
          max = item;
        }
      });

      return max.prevailingMessage;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";

.indicators-widgets {
  padding: 32px 24px;

  &__list {
    display: flex;
    grid-template-columns: 50% 50%;
    grid-row-gap: 24px;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
  }

  .indicator-widget {
    transition: opacity 0.1s linear;
    width: calc(50% - 16px);
  }

  &.hover {
    .indicator-widget:not(.hover) {
      opacity: $baseOpacity;
    }
  }
}
</style>
