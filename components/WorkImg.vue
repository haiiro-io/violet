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
      name: {
        type: String,
        required: true
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
      const slug = this.$route.params.slug;
      return `/images/works/${slug}_${this.name}`;
    }
  }
</script>

<style lang="postcss" scoped>
  img.workImg {
    width: 100%;
  }
</style>
