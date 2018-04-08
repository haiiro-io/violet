<template>
  <div class="workCarousel">
    <no-ssr>
      <carousel
        :per-page="1"
        :loop="true">
        <slide
          v-for="mediaPathFromArray in mediaPaths"
          :key="mediaPathFromArray">
          <work-img :path="mediaPathFromArray" />
        </slide>
      </carousel>
    </no-ssr>
  </div>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "nuxt-class-component";
  import { Carousel, Slide } from "vue-carousel";

  import WorkImg from "./WorkImg.vue";

  @Component({
    components: { Carousel, Slide, WorkImg },
    props: {
      names: {
        type: Array,
        required: true
      }
    }
  })
  export default class WorkCarousel extends Vue {
    names: string[];

    get mediaPaths (): string[] {
      const slug= this.$route.params.slug;
      return this.names.map(n => `/images/work/${slug}_${n}`);
    }
  }
</script>

<style lang="postcss" scoped>

</style>
