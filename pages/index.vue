<template>
  <section class="pageIndex outerMoat">
    <i18n
      path="index.greeting.message"
      tag="h1"
      for="index.greeting.name">
      <nuxt-link
        to="/about"
        @mouseover.native="onFocusName"
        @mouseleave.native="onLeaveFocus">
        {{ $t("index.greeting.name") }}
      </nuxt-link>
    </i18n>
    <div id="works">
      <div
        v-for="work in list"
        :key="work.name"
        @mouseover="onFocusWork(work)"
        @mouseleave="onLeaveFocus"
        class="work">
        <nuxt-link :to="`/works/${work.name}`">
          <img
            class="workThumbnail"
            :src="workImage(work.name)"
          >
          <span class="workTitle">{{ work.title }}</span>
          <span class="workRole">{{ work.role }}</span>
        </nuxt-link>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
  import Component from "nuxt-class-component";
  import PageBase from "~/lib/page-base";
  import { Work } from "~/store/modules/works";

  import { Getter, Action, namespace } from "vuex-class";
  import { name as WorksNamespace } from "~/store/modules/works";
  import { name as PixelsNamespace } from "~/store/modules/pixels";
  const WorksGetter = namespace(WorksNamespace, Getter);
  const PixelsAction = namespace(PixelsNamespace, Action);


  @Component
  export default class PageIndex extends PageBase {
    @WorksGetter pick;
    @PixelsAction setDefaultColors;
    @PixelsAction setColors;

    mounted () {
      this.setDefaultColors();
    }

    get list (): Work[] {
      return process.env.orderedWorks.map(name => this.pick(name));
    }

    workImage (name): string {
      return `/images/works/${name}_thumbnail.jpg`;
    }

    onFocusName () {
      this.setColors(["#555"]);
    }

    onFocusWork (work: Work) {
      this.setColors(work.colors);
    }

    onLeaveFocus () {
      this.setDefaultColors();
    }
  }
</script>

<style lang="postcss">
  @import "../assets/styles/custom-properties.postcss";

  h1 {
    color: var(--konezumi);
    font-size: 36px;
    font-weight: bold;
    line-height: 54px;
    margin-top: 300px;
    margin-bottom: 170px;
    @media (--narrow) {
      font-size: 30px;
      line-height: 48px;
      margin-top: 150px;
      margin-bottom: 85px;
    }
    & > a {
      color: var(--konezumi);
      display:inline-block;
      border-bottom: 4px dashed var(--nibihai);
      padding-bottom: 5px;
      text-decoration: none;
      transition: ease 0.5s;
    }
    & > a:hover {
      color: var(--konezumi);
      border-bottom: 4px dashed var(--konezumi);
      transition: ease 0.5s;
    }
  }

  #works {
    margin-bottom: 70px;

    display: grid;
    grid-template-columns: repeat(3, 4fr);
    grid-column-gap: 1.66%;
    grid-row-gap: 100px;
    @media (--medium) {
      grid-template-columns: repeat(2, 6fr);
      grid-column-gap: 2.63%;
    }
    @media (--narrow) {
      grid-template-columns: repeat(1, 12fr);
      grid-column-gap: 0;
      grid-row-gap: 40px;
    }
  }

  .work {
    display: flex;
    flex-direction: column;
    & a {
      text-decoration: none;
    }
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

  .work:hover {
    & img.workThumbnail {
      opacity: .8;
    }
  }
</style>
