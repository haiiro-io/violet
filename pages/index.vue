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
          <span>{{ work.title }}</span>
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
    width: 100%;
    display: flex;
    flex-flow: row wrap;
  }

  .work {
    display: flex;
    flex-direction: column;
    margin: 15px;
    & img.workThumbnail {
      display: block;
      width: 400px;
      height: 225px;
    }
    & span {
    }
  }
</style>
