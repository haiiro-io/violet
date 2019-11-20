<template>
  <div
    :class="{ 'workMedia--shrink': full === 'false' }"
    class="workMedia"
  >
    <work-carousel
      v-if="multipleFileNames.length > 0"
      :names="multipleFileNames"
    />
    <work-video
      v-else-if="isVideo"
      :path="mediaPath"
    />
    <work-youtube
      v-else-if="isYoutube"
      :path="singleFileName"
    />
    <work-img
      v-else
      :path="mediaPath"
      :alt="alt"
      :caption="caption"
    />
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from "nuxt-property-decorator";

  import WorkImg from "./WorkImg.vue";
  import WorkVideo from "./WorkVideo.vue";
  import WorkCarousel from "./WorkCarousel.vue";
  import WorkYoutube from "./WorkYoutube.vue";

  @Component({
    components: { WorkImg, WorkVideo, WorkCarousel, WorkYoutube },
    props: {
      name: {
        type: String,
        required: true
      },
      alt: {
        type: String
      },
      caption: {
        type: String
      },
      full: {
        type: String
      }
    }
  })
  export default class WorkMedia extends Vue {
    name: string;
    singleFileName: string;
    multipleFileNames: string[] = [];

    created (): void {
      if (this.name.includes(",")) {
        this.multipleFileNames = this.name.split(",");
      } else {
        this.singleFileName = this.name;
      }
    }

    get isVideo (): boolean {
      return !!this.singleFileName && !!this.singleFileName.match(/\.mp4$/);
    }

    get isYoutube (): boolean {
      return !!this.singleFileName.match("https://www.youtube.com");
    }

    get mediaPath (): string {
      const slug = this.$route.params.slug;
      return `/images/work/${slug}/${this.singleFileName}`;
    }
  }
</script>

<style lang="postcss" scoped>
</style>
