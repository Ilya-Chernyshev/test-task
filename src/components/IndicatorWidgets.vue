<template>
  <div class="indicators-widgets" :class="hover">
    <!-- Список виджетов -->
    <div class="indicators-widgets__list">
      <template v-for="(widget, index) in widgets">
        <BaseIndicatorWidget
          @indicator-update="onIndicatorUpdate"
          :data="getDataIndicatorsInPercent(widget)"
          :title="getPrevailingMessage(widget)"
          :key="`widget_${index}`"
        />
      </template>
    </div>
  </div>
</template>

<script lang="ts">
/** Декораторы */
import { Component, Vue } from 'vue-property-decorator';

/** Компоненты */
import BaseIndicatorWidget from '@/components/BaseIndicatorWidget.vue';

/** Типы */
import { IndicatorsWidgets } from '@/types/Indicator';

/** Утилиты */
import getDataIndicatorsInPercent from '@/helpers/getDataIndicatorsInPercent';

/** Данные */
import widgetsData from '@/constants/data';

@Component({
  components: {
    BaseIndicatorWidget,
  },
})
export default class App extends Vue {
  /* --- DATA --- */

  /** css-класс при наведении на индикатор в виджетах.  */
  private hover: Record<string, boolean> = {};

  /** Данны для виджетов. */
  private widgets: IndicatorsWidgets[] = widgetsData;

  /* --- METHODS --- */

  /**
   * Метод для получения данных в процентах.
   * Необходим для корректного отображения индикаторов в шкале с виджетами.
   */
  private getDataIndicatorsInPercent = getDataIndicatorsInPercent;

  /** Обработчик события изменения активного индикатора в виджетах. */
  private onIndicatorUpdate(index: number | null) {
    this.hover = { hover: index !== null };
  }

  /** Метод получения заголовка для виджета. */
  private getPrevailingMessage(dataWidgets: IndicatorsWidgets) {
    let max = dataWidgets.indicatorsWidgets[0] || { value: 0 };

    dataWidgets.indicatorsWidgets.forEach((item) => {
      if (max.value < item.value) {
        max = item;
      }
    });

    return max.prevailingMessage;
  }
}
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
