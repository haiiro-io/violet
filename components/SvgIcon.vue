<template>
  <svg class="svgIcon">
    <use :xlink:href="'#' + name" />
  </svg>
</template>

<script lang="ts">
  import { Component, Vue } from "nuxt-property-decorator";

  const files = require.context("assets/icons", true, /\.svg$/);
  files.keys().forEach(files);

  @Component({
    props: {
      name: {
        type: String,
        required: true
      }
    }
  })
  export default class SvgIcon extends Vue {
  }
</script>

<style lang="postcss" scoped>
</style>
