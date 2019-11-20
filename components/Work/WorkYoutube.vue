<template>
  <div class="workYoutubeParent">
    <div class="workYoutube">
      <div
        ref="player"
        class="workYoutube-player"
      />
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from "nuxt-property-decorator";
  import YouTubePlayer from "youtube-player";

  @Component({
    props: {
      path: {
        type: String,
        required: true
      }
    }
  })
  export default class WorkYoutube extends Vue {
    path: string;
    $refs: {
      player: HTMLDivElement;
    }

    mounted (): void {
      const videoId = this.path.match(/v=(.+)$/);
      if (videoId) {
        YouTubePlayer(
          this.$refs.player,
          {
            videoId: videoId[1],
            width: (this.$el as HTMLDivElement).offsetWidth,
            height: (this.$el as HTMLDivElement).offsetHeight
          }
        );
      }
    }
  }
</script>

<style lang="postcss" scoped>
  .workYoutubeParent {
    margin: 0 auto;
  }
  .workYoutube {
    position: relative;
    height: 0;
    padding-bottom: 56.25%;
  }
  .workYoutube >>> iframe.workYoutube-player {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>
