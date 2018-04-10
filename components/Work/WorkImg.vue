<template>
  <img
    class="workImg"
    :alt="alt"
    :src="path"
  >
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "nuxt-class-component";

  @Component({
    props: {
      path: {
        type: String,
        required: true
      },
      alt: {
        type: String
      }
    }
  })
  export default class WorkImg extends Vue {
  }
</script>

<style lang="postcss" scoped>
  img.workImg {
    width: 100%;
  }
</style>
