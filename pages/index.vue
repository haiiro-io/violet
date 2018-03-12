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
      </li>
    </ul>
  </section>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "nuxt-class-component";
  import { Getter, namespace } from "vuex-class";
  import { name as WorksNamespace } from "~/store/modules/works";
  const WorksGetter = namespace(WorksNamespace, Getter);

  @Component
  export default class extends Vue {
    @WorksGetter list;

    head () {
      return {
        meta: [
          { name: "og:image", content: this.ogImage },
          { name: "twitter:image", content: this.ogImage }
        ]
      };
    }

    get ogImage (): string {
      return `${process.env.baseUrl}/images/ogp_1200x630.jpg`;
    }
  }
</script>

<style lang="postcss">
</style>
