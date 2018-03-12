<template>
  <img
    class="workImg"
    :alt="alt"
    :src="imagePath"
  >
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "nuxt-class-component";

  @Component({
    props: {
      work: {
        type: String,
        required: true
      },
      name: {
        type: Number,
        required: true
      },
      ext: {
        type: String,
        default: () => 'jpg',
      },
      alt: {
        type: String
      }
    }
  })
  export default class WorkImg extends Vue {
    work: string;
    name: string;
    ext: string;

    get imagePath (): string {
      return `/images/works/${this.work}_${this.name}.${this.ext}`;
    }
  }
</script>

<style lang="postcss" scoped>
  img.workImg {
    width: 100%;
  }
</style>
