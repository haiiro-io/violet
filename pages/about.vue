<template>
  <section>
    <h1>About</h1>
  </section>
</template>

<script lang="ts">
  import VueI18n from "vue-i18n";
  import Component from "nuxt-class-component";
  import PageBase from "../lib/page-base";

  @Component
  export default class PageAbout extends PageBase {
    get pageTitle (): VueI18n.LocaleMessage {
      return this.$t("about.title");
    }
  }
</script>

<style lang="postcss">
</style>
