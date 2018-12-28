<template>
  <video
    class="workVideo"
    width="100%"
    autoplay
    loop
  >
    <source
      :src="path"
      type="video/mp4"
    >
    Your browser does not support the video tag.
  </video>
</template>

<script lang="ts">
  import { Component, Vue } from "nuxt-property-decorator";

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
  export default class WorkVideo extends Vue {
  }
</script>

<style lang="postcss" scoped>
  img.workVideo {
    width: 100%;
  }
</style>
