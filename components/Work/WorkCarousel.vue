<template>
  <div class="workCarousel">
    <client-only>
      <carousel
        :per-page="1"
        :loop="true"
        :pagination-size="12"
        pagination-color="#999999"
        pagination-active-color="#555555"
      >
        <slide
          v-for="mediaPathFromArray in mediaPaths"
          :key="mediaPathFromArray"
        >
          <work-img :path="mediaPathFromArray" />
        </slide>
      </carousel>
    </client-only>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from "nuxt-property-decorator";

  import WorkImg from "./WorkImg.vue";

  @Component({
    components: { WorkImg },
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
      return this.names.map(n => `/images/work/${slug}/${n}`);
    }
  }
</script>

<style lang="postcss" scoped>
  .workCarousel >>> .VueCarousel-dot-button {
    border-radius: 0;
  }
  .workCarousel >>> .VueCarousel-dot-button:focus {
    outline: none;
  }
</style>
