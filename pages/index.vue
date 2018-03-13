<template>
  <section>
    <h1>{{ $t("index.greeting") }}</h1>
    <ul>
      <li>
        <nuxt-link to="/about">About</nuxt-link>
      </li>
      <li
        v-for="work in list"
        :key="work.name">
        <nuxt-link :to="`/works/${work.name}`">{{ work.title }}</nuxt-link>
        <img
          class="workThumbnail"
          :src="workImage(work.name)"
        >
      </li>
    </ul>
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
  img.workThumbnail {
    width: 400px;
  }
</style>
