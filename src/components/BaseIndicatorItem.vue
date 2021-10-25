<template>
  <div class="indicator-item" :style="style" :width="width"></div>
</template>

<script lang="ts">
/** Декораторы */
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class BaseIndicatorItem extends Vue {
  /* --- PROPS --- */

  /** Ширина */
  @Prop({ type: [String, Number], default: 0 })
  public declare readonly width: string | number;

  /** Цвет */
  @Prop({ type: String, default: '#000', required: true })
  public declare readonly color: string;

  /* --- DATA --- */

  /** Единица измерения ширины по-умолчанию. Используется, когда ширина с типом Number */
  private defaultUnitOfSize = 'px';

  /* --- COMPUTED --- */

  /**
   * Получаем ширину полоски для css-стиля.
   * Необходим для того, чтобы поставить для числовых значений единицу измерения по умолчанию.
   * Для строковых значений оставляем как есть.
   */
  private get widthForStyle(): string {
    return typeof this.width === 'number' ? `${this.width}${this.defaultUnitOfSize}` : this.width;
  }

  /** Стили для индикатора. */
  private get style(): Record<string, string>[] {
    return [{ backgroundColor: this.color }, { width: this.widthForStyle }];
  }
}
</script>

<style lang="scss" scoped>
  .indicator-item {
    height: 6px;
    min-width: 8px;
    margin: 0 1px;
  }
</style>
