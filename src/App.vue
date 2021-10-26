

<template>
  <div id="app">
    <!-- Блок с виджетами -->
    <IndicatorWidgets />
  </div>
</template>
<script>
import IndicatorWidgets from "@/components/IndicatorWidgets";

export default {
  components: {
    IndicatorWidgets,
  },
};
</script>

<style lang="scss">
@import "normalize-scss";
@import url("http://fonts.cdnfonts.com/css/lab-grotesque");

@include normalize();

#app {
  font-family: "Lab Grotesque", sans-serif;
}
</style>
