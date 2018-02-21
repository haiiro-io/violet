<template>
  <div>
    here's {{$route.params.slug}} work
  </div>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "nuxt-class-component";

  @Component
  export default class PageSelectedWork extends Vue {
  }
</script>

<style lang="postcss">
</style>
