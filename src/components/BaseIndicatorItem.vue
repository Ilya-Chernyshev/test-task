<template>
  <div class="indicator-item" :style="style" :width="width"></div>
</template>

<script>
export default {
  /* --- PROPS --- */

  props: {
    /** Ширина. */
    width: {
      type: [String, Number],
      default: 0,
    },

    /** Цвет. */
    color: {
      type: String,
      default: "#000",
      required: true,
    },
  },

  /* --- DATA --- */

  data() {
    return {
      /** Единица измерения ширины по-умолчанию. Используется, когда ширина с типом Number */
      defaultUnitOfSize: "px",
    };
  },

  /* --- COMPUTED --- */

  computed: {
    /**
     * Получаем ширину полоски для css-стиля.
     * Необходим для того, чтобы поставить для числовых значений единицу измерения по умолчанию.
     * Для строковых значений оставляем как есть.
     *
     * @returns {string} - Ширина полоски.
     */
    widthForStyle() {
      return typeof this.width === "number"
        ? `${this.width}${this.defaultUnitOfSize}`
        : this.width;
    },

    /**
     * Стили для индикатора.
     *
     * @returns {Array.<Object<string, string>>}
     */
    style() {
      return [{ backgroundColor: this.color }, { width: this.widthForStyle }];
    },
  },
};
</script>

<style lang="scss" scoped>
.indicator-item {
  height: 6px;
  min-width: 8px;
  margin: 0 1px;
}
</style>
