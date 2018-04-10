<template>
  <div class="workMedia">
    <work-carousel
      v-if="multipleFileNames.length > 0"
      :names="multipleFileNames" />
    <work-video
      v-else-if="isVideo"
      :path="mediaPath"
    />
    <work-img
      v-else
      :path="mediaPath"
      :alt="alt"
    />
  </div>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "nuxt-class-component";

  import WorkImg from "./WorkImg.vue";
  import WorkVideo from "./WorkVideo.vue";
  import WorkCarousel from "./WorkCarousel.vue";

  @Component({
    components: { WorkImg, WorkVideo, WorkCarousel },
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
  export default class WorkMedia extends Vue {
    name: string;
    singleFileName: string;
    multipleFileNames: string[] = [];

    created () {
      if (this.name.includes(",")) {
        this.multipleFileNames = this.name.split(",");
      } else {
        this.singleFileName = this.name;
      }
    }

    get isVideo (): boolean {
      return !!this.singleFileName && !!this.singleFileName.match(/\.mp4$/);
    }

    get mediaPath (): string {
      const slug = this.$route.params.slug;
      return `/images/work/${slug}_${this.singleFileName}`;
    }
  }
</script>

<style lang="postcss" scoped>

</style>
