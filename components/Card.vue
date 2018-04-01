<template>
  <nuxt-link
    class="card"
    :to="`/works/${work.name}`"
    @mouseover.native="onFocusWork"
    @mouseleave.native="setDefaultColors">
    <img
      class="workThumbnail"
      :src="workImage"
    >
    <span class="workTitle">{{ work.title }}</span>
    <span class="workRole">{{ work.role }}</span>
  </nuxt-link>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "nuxt-class-component";

  import { Action, namespace } from "vuex-class";
  import { name as PixelsNamespace } from "~/store/modules/pixels";
  const PixelsAction = namespace(PixelsNamespace, Action);

  import { Work } from "~/store/modules/works";

  @Component({
    props: {
      work: {
        type: Object,
      }
    }
  })
  export default class Card extends Vue {
    @PixelsAction setDefaultColors;
    @PixelsAction setColors;

    work: Work;

    get workImage (): string {
      return `/images/works/${this.work.name}_thumbnail.jpg`;
    }

    onFocusWork () {
      this.setColors(this.work.colors);
    }
  }
</script>

<style lang="postcss" scoped>
  .card {
    display: flex;
    flex-direction: column;
    text-decoration: none;
    & img.workThumbnail {
      display: block;
      width: 100%;
    }
    & span {
      display: block;
    }
    & span.workTitle {
      color: var(--konezumi);
      margin-top: 10px;
      font-weight: bold;
      font-size: 16px;
      @media (--wide) {
        font-size: 18px;
      }
    }
    & span.workRole {
      color: var(--nibihai);
      margin-top: 5px;
      font-weight: normal;
      font-size: 14px;
    }
  }

  .card:hover {
    & img.workThumbnail {
      opacity: .8;
    }
  }
</style>
