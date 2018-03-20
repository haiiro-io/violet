<template>
  <section class="pageIndex">
    <i18n
      path="index.greeting.message"
      tag="h1"
      for="index.greeting.name">
      <nuxt-link to="/about">{{ $t("index.greeting.name") }}</nuxt-link>
    </i18n>
    <div id="works">
      <div
        v-for="work in list"
        :key="work.name"
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
  import PageBase from "../lib/page-base";
  import { Work } from "../store/modules/works";
  import { Getter, namespace } from "vuex-class";
  import { name as WorksNamespace } from "~/store/modules/works";
  const WorksGetter = namespace(WorksNamespace, Getter);

  @Component
  export default class PageIndex extends PageBase {
    @WorksGetter pick;

    get list (): Work[] {
      return process.env.orderedWorks.map(name => this.pick(name));
    }

    workImage (name): string {
      return `/images/works/${name}_thumbnail.jpg`;
    }
  }
</script>

<style lang="postcss">
  section.pageIndex {
  }

  #works {
    width: 83%;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(3, 4fr);
    grid-column-gap: 1.66%;
    grid-row-gap: 100px;
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
