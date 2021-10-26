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
        {{ labelTitle }}
      </div>

      <!-- Описание ярлыка -->
      <div class="indicator-scale-bar__label-description">
        {{ labelDescription }}
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
<script>
/** Компоненты */
import BaseIndicatorItem from "@/components/BaseIndicatorItem.vue";

export default {
  components: {
    BaseIndicatorItem,
  },

  /* --- PROPS --- */

  props: {
    /** Данные по индикаторам. */
    dataIndicators: {
      type: Array,
      required: true,
      default: () => [],
    },

    /** Признак отображения ярлыка. */
    showLabel: {
      type: Boolean,
      default: true,
    },
  },

  /* --- DATA --- */

  data() {
    return {
      /** Активный индекс индикатора. */
      activeIndex: null,

      /** Позиция ярлыка по оси Х. Данная позиция не берет во внимание остальные размеры. */
      labelPositionX: null,

      /** css-стили ярлыка. */
      labelStyle: {},
    };
  },

  /* --- COMPUTED --- */

  computed: {
    /**
     * CSS-класс для шкалы индикаторной шкалы. Активируется при наведении на индикатор.
     *
     * @returns {Object<string, boolean>}
     */
    hoverClass() {
      return { hover: this.activeIndex !== null };
    },

    /**
     * Активный индикатор.
     *
     * @returns {{ width: string | number, color: string, value: string, description: string} | null} - Активный индикатор, если такой существует.
     */
    activeIndicator() {
      if (this.activeIndex !== null) {
        return this.dataIndicators[this.activeIndex];
      }
      return null;
    },

    /**
     * Текст описания ярлыка.
     *
     * @returns {string} - Описание ярлыка.
     */
    labelDescription() {
      return this.activeIndicator?.description ?? "";
    },

    /**
     * Текст заголовка ярлыка.
     *
     * @returns {string} - Заголовок ярлыка.
     */
    labelTitle() {
      return this.activeIndicator?.value
        ? `${this.activeIndicator.value} — ${this.activeIndicator.width}`
        : "";
    },

    /**
     * Стили для заголовка ярлыка.
     *
     * @returns {Object<string, string>}
     */
    labelTitleStyle() {
      return { color: this.activeIndicator?.color ?? "" };
    },
  },

  /* --- WATCHERS --- */

  watch: {
    /** Наблюдатель за изменением выбранного индекса индикатора. */
    activeIndex() {
      this.$emit("indicator-update", this.activeIndex);
    },
  },

  /* --- METHODS --- */

  methods: {
    /** Обработчик события mouseout. */
    onIndicatorMouseout() {
      this.labelPositionX = null;
      this.activeIndex = null;

      this.setStyleForLabel();
    },

    /**
     * Обработчик события mouseover.
     *
     * @param {Event} event - Дескриптор события.
     */
    onIndicatorMouseover(event) {
      const target = event.target;
      const index = this.getIndicatorIndexByElement(target);

      if (index !== null && this.dataIndicators[index]) {
        this.labelPositionX = target.offsetLeft;
        this.activeIndex = index;

        // Ожидаем обновления DOM, после чего получаем стили для label.
        this.$nextTick(() => {
          this.setStyleForLabel();
        });
      }
    },

    /** Установка стилей для ярлыка */
    setStyleForLabel() {
      this.labelStyle = this.getPositionForLabel();
      this.labelStyle.opacity = this.labelStyle?.transform ? 1 : 0;
    },

    /**
     * Получения позиции ярлыка. Вызывается при наведении на индикаторы.
     *
     * @returns {Object<string, string | number>} - Объект с css-классом
     */
    getPositionForLabel() {
      if (this.labelPositionX === null || !this.$refs?.label.clientWidth) {
        return {};
      }

      const scaleBarWidth = this.$el.clientWidth;
      const labelWidth = this.$refs?.label.clientWidth;
      const labelWidthWithPosition = this.labelPositionX + labelWidth;
      let labelPosition = this.labelPositionX;

      if (labelWidthWithPosition > scaleBarWidth) {
        const widthDifference = labelPosition - scaleBarWidth;

        labelPosition -= widthDifference;
        labelPosition -= labelWidth;
      }

      return { transform: `translateX(${labelPosition}px)` };
    },

    /**
     * Метод получения индекса индикатора по HTML-элементу.
     *
     * @param {HTMLElement} target - Элемент DOM
     * @returns {number | null} - Индекс элемента
     */
    getIndicatorIndexByElement(target) {
      const index = Number(target.dataset.index);

      if (Number.isNaN(index) || target === this.$el) {
        return null;
      }

      return index;
    },

    /**
     * Метод получения активного css-класса для индикатора.
     *
     * @param {number} index - Индекс активного индикатора
     * @returns {Object<string, string | number>} - Объект с css-классом
     */
    getIndicatorActiveClassByIndex(index) {
      return { active: index === this.activeIndex };
    },
  },
};
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
