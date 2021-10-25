<template>
  <div id="app">
    <!-- Блок с виджетами -->
    <IndicatorWidgets />
  </div>
</template>

<script lang="ts">
/** Декораторы */
import { Component, Vue } from 'vue-property-decorator';

/** Компоненты */
import IndicatorWidgets from '@/components/IndicatorWidgets.vue';

@Component({
  components: {
    IndicatorWidgets,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
@import 'normalize-scss';
@import url('http://fonts.cdnfonts.com/css/lab-grotesque');
@include normalize();

#app {
  font-family: 'Lab Grotesque', sans-serif;
}
</style>
