<template>
  <div
    class="indicator-scale-bar"
    @mouseout="onIndicatorMouseout"
    @mouseover="onIndicatorMouseover"
    :class="hoverClass"
  >
    <!-- Ярлык для показа значений из индикаторов -->
    <div
      v-if="showLabel"
      ref="label"
      class="indicator-scale-bar__label"
      :style="labelStyle"
    >
      <!-- Заголовок ярлыка -->
      <div class="indicator-scale-bar__label-title" :style="labelTitleStyle">
        {{ labelTitleText }}
      </div>

      <!-- Описание ярлыка -->
      <div class="indicator-scale-bar__label-description">
        {{ labelDescriptionText }}
      </div>
    </div>

    <!-- Список индикаторов -->
    <div class="indicator-scale-bar__list">
      <template v-for="(indicator, index) in dataIndicators">
        <BaseIndicatorItem
          :key="`indicator_${index}`"
          :width="indicator.width"
          :color="indicator.color"
          :class="getIndicatorActiveClassByIndex(index)"
          :data-index="index"
        />
      </template>
    </div>
  </div>
</template>
<script lang="ts">
/** Декораторы */
import {
  Component, Vue, Prop, Ref, Watch,
} from 'vue-property-decorator';

/** Компоненты */
import BaseIndicatorItem from '@/components/BaseIndicatorItem.vue';

/** Типы */
import { Indicator } from '@/types/Indicator';

@Component({
  components: {
    BaseIndicatorItem,
  },
})
export default class BaseIndicatorScaleBar extends Vue {
  /* --- PROPS --- */

  /** Данные по индикаторам. */
  @Prop({ type: Array, default: () => [], required: true })
  public declare readonly dataIndicators: Indicator[];

  /** Признак отображения ярлыка. */
  @Prop({ type: Boolean, default: true })
  public declare readonly showLabel: boolean;

  /* --- REFS --- */

  /** Ссылка на ярлык. */
  @Ref('label')
  private declare readonly indicatorLabel: HTMLElement;

  /* --- DATA --- */

  /** Активный индекс индикатора. */
  private activeIndex: number | null = null;

  /** Позиция ярлыка по оси Х. Данная позиция не берет во внимание остальные размеры. */
  private labelPositionX: number | null = null;

  /** css-стили ярлыка. */
  private labelStyle: Record<string, string | number> = {};

  /* --- COMPUTED --- */

  /** CSS-класс для шкалы индикаторной шкалы. Активируется при наведении на индикатор. */
  private get hoverClass(): Record<string, boolean> {
    return { hover: this.activeIndex !== null };
  }

  /** Активный индикатор. */
  private get activeIndicator(): Indicator | null {
    if (this.activeIndex !== null) {
      return this.dataIndicators[this.activeIndex];
    }
    return null;
  }

  /** Текст описания в ярлыке. */
  private get labelDescriptionText() {
    return this.activeIndicator?.description ?? '';
  }

  /** Текст в заголовке ярлыка. */
  private get labelTitleText() {
    return this.activeIndicator?.value
      ? `${this.activeIndicator.value} — ${this.activeIndicator.width}`
      : '';
  }

  /** Стили для заголовка ярлыка. */
  private get labelTitleStyle() {
    return { color: this.activeIndicator?.color ?? '' };
  }

  /* --- WATCHERS --- */

  /** Наблюдатель за изменением выбранного индекса индикатора. */
  @Watch('activeIndex')
  private onActiveIndexChanged() {
    this.$emit('indicator-update', this.activeIndex);
  }

  /* --- METHODS --- */

  /** Обработчик события mouseout. */
  private onIndicatorMouseout(): void {
    this.labelPositionX = null;
    this.activeIndex = null;

    this.setLabelStyle();
  }

  /** Обработчик события mouseover. */
  private onIndicatorMouseover(event: Event): void {
    const target = event.target as HTMLElement;
    const index = this.getIndicatorIndexForElement(target);

    if (index !== null && this.dataIndicators[index]) {
      this.labelPositionX = target.offsetLeft;
      this.activeIndex = index;

      // Ожидаем обновления DOM, после чего получаем стили для label.
      this.$nextTick(() => {
        this.setLabelStyle();
      });
    }
  }

  /** Установка стилей для ярлыка */
  private setLabelStyle() {
    this.labelStyle = this.getPositionLabel();
    this.labelStyle.opacity = this.labelStyle?.transform ? 1 : 0;
  }

  /** Получения позиции ярлыка. Вызывается при наведении на индикаторы. */
  private getPositionLabel(): Record<string, string | number> {
    if (this.labelPositionX === null || !this.indicatorLabel.clientWidth) {
      return {};
    }

    const scaleBarWidth = this.$el.clientWidth;
    const labelWidth = this.indicatorLabel.clientWidth;
    const labelWidthWithPosition = this.labelPositionX + labelWidth;
    let labelPosition = this.labelPositionX;

    if (labelWidthWithPosition > scaleBarWidth) {
      const widthDifference = labelPosition - scaleBarWidth;

      labelPosition -= widthDifference;
      labelPosition -= labelWidth;
    }

    return { transform: `translateX(${labelPosition}px)` };
  }

  /** Метод получения индекса индикатора по HTML-элементу. */
  private getIndicatorIndexForElement(target: HTMLElement): number | null {
    const index = Number(target.getAttribute('data-index'));

    if (Number.isNaN(index) || target === this.$el) {
      return null;
    }

    return index;
  }

  /** Метод получения активного css-класса для индикатора. */
  private getIndicatorActiveClassByIndex(
    index: number,
  ): Record<string, boolean> {
    return { active: index === this.activeIndex };
  }
}
</script>
<style lang="scss" scoped>
@import "@/styles/variables.scss";
@import "@/styles/mixins.scss";

$heightScaleBar: 58px;

.indicator-scale-bar {
  display: flex;
  position: relative;
  align-items: center;
  height: $heightScaleBar;

  &__label {
    display: flex;
    position: absolute;
    flex-direction: column;
    justify-content: space-between;
    height: $heightScaleBar;
    transition: opacity 0.1s linear;
    text-align: left;
    line-height: 22px;
    font-size: 14px;
    z-index: 1;
    left: 0;
    top: 0;
    max-width: 100%;

    &-title {
      @include text-ellipsis;
      font-weight: 700;
    }

    &-description {
      @include text-ellipsis;
      color: $primaryText;
    }
  }

  &__list {
    display: flex;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
    width: 100%;
    z-index: 2;
  }

  .indicator-item {
    cursor: pointer;
    transition: opacity 0.1s linear;
    position: relative;

    &:first-child {
      margin-left: 0;
    }

    &:last-child {
      margin-right: 0;
    }
  }

  &.hover {
    .indicator-item:not(.active) {
      opacity: $baseOpacity;
    }
  }
}
</style>
