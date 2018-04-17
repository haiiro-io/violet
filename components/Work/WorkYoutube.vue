<template>
  <div class="workYoutubeParent">
    <div class="workYoutube">
      <div
        class="workYoutube-player"
        ref="player" />
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "nuxt-class-component";
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

    mounted () {
      const videoId = this.path.match(/v=(.+)$/);
      if (videoId) {
        const player = YouTubePlayer(
          this.$refs.player,
          {
            videoId: videoId[1],
            width: this.$el.offsetWidth,
            height: this.$el.offsetHeight
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
