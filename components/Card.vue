<template>
  <nuxt-link
    v-if="isWork"
    :to="`/work/${work.name}`"
    class="card"
    @mouseenter.native="onFocusCard"
    @mouseleave.native="setDefaultColors"
  >
    <div class="cardThumbnail-container">
      <div
        v-lazy:background-image="cardImage"
        class="cardThumbnail"
      />
    </div>
    <span class="cardTitle">
      {{ work.title }}
    </span>
    <span class="cardRole">
      {{ work.role }}
    </span>
  </nuxt-link>
  <a
    v-else
    :href="article.url"
    class="card"
    target="_blank"
    @mouseenter="onFocusCard"
    @mouseleave="setDefaultColors"
  >
    <div class="cardThumbnail-container">
      <div
        v-lazy:background-image="cardImage"
        class="cardThumbnail"
      />
    </div>
    <span class="cardTitle">
      {{ article.title }}
    </span>
    <span class="cardRole">
      {{ article.appear_on }}
    </span>
  </a>
</template>

<script lang="ts">
  import { Component, Vue } from "nuxt-property-decorator";

  import { namespace } from "vuex-class";
  import { name as PixelsNamespace } from "~/store/pixels";
  const PixelsStore = namespace(PixelsNamespace);

  import { Work } from "~/store/work";

  @Component({
    props: {
      work: {
        type: Object,
      },
      article: {
        type: Object
      }
    }
  })
  export default class Card extends Vue {
    @PixelsStore.Action setDefaultColors;
    @PixelsStore.Action setColors;

    work: Work;
    article: any;

    get isWork (): boolean {
      return !!this.work;
    }

    get cardImage (): string {
      return this.isWork ?
        `/images/work/${this.work.name}/_thumbnail.jpg` :
        `/images/articles/${this.article.name}.jpg`;
    }

    onFocusCard (): void {
      this.setColors(this.isWork ? this.work.colors : this.article.colors);
    }
  }
</script>

<style lang="postcss" scoped>
  .card {
    display: flex;
    flex-direction: column;
    text-decoration: none;
    width: 100%;
    transition: all ease 0.4s;
    & .cardThubnail-container {
      position: absolute;
    }
    & .cardThumbnail {
      display: block;
      width: 100%;
      position: relative;
      height: 0;
      padding-bottom: 56.25%;
      background-size: contain, cover;
      background-repeat: no-repeat;
      background-color: var(--soba);
      transition: all ease .75s;
      opacity: .7;
      &[lazy='loaded'] {
        opacity: 1;
        background-color: unset;
      }
    }
    & span {
      display: block;
    }
    & span.cardTitle {
      color: var(--konezumi);
      margin-top: 10px;
      font-weight: bold;
      font-size: 16px;
      line-height: 1.5;
      @media (--wide) {
        font-size: 18px;
      }
    }
    & span.cardRole {
      color: var(--nibihai);
      margin-top: 5px;
      font-weight: normal;
      font-size: 14px;
    }
  }

  .card:hover {
    opacity: .75;
    & span.cardTitle {
      color: color(var(--konezumi) alpha(80%));
    }
  }
</style>
