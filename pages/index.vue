<template>
  <section class="pageIndex outerMoat">
    <i18n
      path="index.greeting.message"
      tag="h1"
      for="index.greeting.name">
      <nuxt-link
        to="/about"
        @mouseover.native="setColors(['#555'])"
        @mouseleave.native="setDefaultColors">
        {{ $t("index.greeting.name") }}
      </nuxt-link>
    </i18n>
    <div id="works">
      <card
        v-for="work in list"
        :key="work.name"
        :work="work" />
    </div>
  </section>
</template>

<script lang="ts">
  import Component from "nuxt-class-component";
  import PageBase from "~/lib/page-base";
  import { Work } from "~/store/modules/work";

  import { Getter, Action, namespace } from "vuex-class";
  import { name as WorksNamespace } from "~/store/modules/work";
  import { name as PixelsNamespace } from "~/store/modules/pixels";
  const WorksGetter = namespace(WorksNamespace, Getter);
  const PixelsAction = namespace(PixelsNamespace, Action);

  import Card from "~/components/Card.vue";

  @Component({
    components: { Card }
  })
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
  }
</script>

<style lang="postcss">
  @import "../assets/styles/custom-properties.postcss";

  .pageIndex {
    padding: 0 20px;
  }

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
      display:inline;
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
</style>
