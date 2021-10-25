<template>
  <div class="indicator-widget" :class="hover">
    <!-- Заголовок виджета -->
    <div class="indicator-widget__title">{{ title }}</div>

    <!-- Индикаторная шкала -->
    <BaseIndicatorScaleBar
      :data-indicators="data"
      @indicator-update="onIndicatorUpdate"
    />
  </div>
</template>

<script lang="ts">
/** Декораторы */
import { Component, Vue, Prop } from 'vue-property-decorator';

/** Компоненты */
import BaseIndicatorScaleBar from '@/components/BaseIndicatorScaleBar.vue';

/** Типы */
import { Indicator } from '@/types/Indicator';

@Component({
  components: {
    BaseIndicatorScaleBar,
  },
})
export default class BaseIndicatorWidget extends Vue {
  /* --- PROPS --- */

  /** Данные для формирования виджета. */
  @Prop({ type: Array, default: () => [], required: true })
  public declare readonly data: Indicator[];

  /** Заголовок виджета. */
  @Prop({ type: String, default: '' })
  public declare readonly title: string;

  /* --- DATA --- */

  /** css-класс при наведении на индикатор в виджетах.  */
  private hover: Record<string, boolean> = {};

  /* --- METHODS --- */

  /** Обработчик события изменения активного индикатора в виджете. */
  private onIndicatorUpdate(index: number | null) {
    this.hover = { hover: index !== null };
    this.$emit('indicator-update', index);
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";
@import "@/styles/mixins.scss";

.indicator-widget {
  display: grid;
  grid-template-columns: 120px calc(100% - 120px);
  align-items: center;

  &__title {
    margin-right: 16px;
    font-size: 16px;
    line-height: 24px;
    color: $primaryText;
    max-width: 120px;
    white-space: nowrap;
  }

  .indicator-scale-bar {
    width: 100%;
  }
}
</style>
