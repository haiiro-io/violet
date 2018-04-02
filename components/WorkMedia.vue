<template>
  <div class="workMedia">
    <work-video
      v-if="isVideo"
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

  @Component({
    components: { WorkImg, WorkVideo },
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

    get isVideo (): boolean {
      return !!this.name.match(/\.mp4$/);
    }

    get mediaPath (): string {
      const slug = this.$route.params.slug;
      return `/images/work/${slug}_${this.name}`;
    }
  }
</script>

<style lang="postcss" scoped>
  img.workMedia {
    width: 100%;
  }
</style>
