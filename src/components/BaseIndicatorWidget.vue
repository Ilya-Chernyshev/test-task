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

<script>
/** Компоненты */
import BaseIndicatorScaleBar from "@/components/BaseIndicatorScaleBar.vue";

export default {
  components: {
    BaseIndicatorScaleBar,
  },

  /* --- PROPS --- */

  props: {
    /** Данные для формирования виджета. */
    data: {
      type: Array,
      required: true,
      default: () => [],
    },
    
    /** Заголовок виджета. */
    title: {
      type: String,
      default: "",
    },
  },

  /* --- DATA --- */

  data() {
    return {
      /** css-класс при наведении на индикатор в виджетах.  */
      hover: {},

      /** Данны для виджетов. */
      widgets: this.widgetsData,
    };
  },

  /* --- METHODS --- */

  methods: {
    /**
     * Обработчик события изменения активного индикатора в виджете.
     *
     * @param {number | null} index - Индекс активного индикатора
     */
    onIndicatorUpdate(index) {
      this.hover = { hover: index !== null };
      this.$emit("indicator-update", index);
    },
  },
};
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
