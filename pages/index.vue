<template>
  <section class="pageIndex outerMoat">
    <i18n
      path="index.greeting.message"
      tag="h1"
      for="index.greeting.name"
    >
      <nuxt-link
        to="/about"
        @mouseenter.native="setColors(['#555'])"
        @mouseleave.native="setDefaultColors"
      >
        {{ $t("index.greeting.name") }}
      </nuxt-link>
    </i18n>
    <div id="works">
      <card
        v-for="work in list"
        :key="work.name"
        :work="work"
      />
    </div>
    <div id="articles">
      <span class="articlesTitle">
        Articles
      </span>
      <div class="articleCards">
        <card
          v-for="article in articles.slice(0, articlesLimit)"
          :key="article.name"
          :article="article"
        />
      </div>
      <a
        v-if="articles.length > articlesLimit"
        href="#"
        class="articles-seeMore"
        @click.prevent="articlesLimit = articles.length"
      >
        See More
      </a>
    </div>
  </section>
</template>

<script lang="ts">
  import { Component } from "nuxt-property-decorator";
  import PageBase from "~/lib/page-base";
  import { Work } from "~/store/work";

  import { namespace } from "vuex-class";
  import { name as WorksNamespace } from "~/store/work";
  import { name as PixelsNamespace } from "~/store/pixels";
  const WorksStore = namespace(WorksNamespace);
  const PixelsStore = namespace(PixelsNamespace);

  import articleSources from "~/contents/articles.md";
  import Card from "~/components/Card.vue";

  @Component({
    components: { Card }
  })
  export default class PageIndex extends PageBase {
    @WorksStore.Getter pick;
    @PixelsStore.Action updateDefaultColors;
    @PixelsStore.Action setDefaultColors;
    @PixelsStore.Action setColors;
    articlesLimit = 3;

    mounted (): void {
      this.updateDefaultColors();
    }

    get list (): Work[] {
      return process.env.orderedWorks.split(",").map(name => this.pick(name));
    }

    get articles (): any {
      return articleSources.attributes.articles.filter(article => article.locale.includes(process.env.buildLocale));
    }
  }
</script>

<style lang="postcss">
  @import "~/assets/styles/custom-properties.postcss";

  .pageIndex {
    padding: 0 20px;
  }

  h1 {
    color: var(--konezumi);
    font-size: 36px;
    font-weight: bold;
    line-height: 1.7;
    margin-top: 300px;
    margin-bottom: 170px;
    @media (--narrow) {
      font-size: 26px;
      margin-top: 150px;
      margin-bottom: 85px;
    }
    & > a {
      color: var(--konezumi);
      display:inline;
      border-bottom: 4px dashed var(--nibihai);
      text-decoration: none;
      transition: ease 0.5s;
    }
    & > a:hover {
      color: var(--konezumi);
      border-bottom: 4px dashed var(--konezumi);
      transition: ease 0.5s;
    }
  }

  #works, .articleCards {
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
    align-content: center;
  }
  #works, #articles {
    margin-bottom: 120px;
    @media (--narrow)  {
      margin-bottom: 70px;
    }
  }
  .articlesTitle {
    display: block;
    text-align: center;
    margin-bottom: 40px;
    line-height: 1.7;
    color: var(--nibihai);
    font-weight: bold;
    font-size: 40px;
    @media (--narrow)  {
      font-size: 32px;
    }
  }
  a.articles-seeMore {
    display: block;
    text-align: center;
    margin-top: 40px;
    text-decoration: none;
    color: var(--konezumi);
    font-weight: bold;
    font-size: 18px;
    @media (--narrow)  {
      font-size: 16px;
    }
  }
  a.articles-seeMore:hover {
    color: var(--nibihai);
  }
  .card {
    transition: all .75s ease;
    justify-self: center;
  }
</style>
