<template>
  <div class="container">
    <nuxt/>
  </div>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "nuxt-class-component";
  import { Mutation } from "vuex-class";

  @Component
  export default class RootLayout extends Vue {
    @Mutation ("SET_LOCALE") setLocale;

    beforeMount () {
      const locale = window.location.href.includes("haiji.co") ? "ja" : "en";
      this.$i18n.locale = locale;
      this.setLocale(locale);
    }
  }
</script>


<style lang="postcss">
  @import url("https://use.typekit.net/sff2rot.css");

  body {
    margin: 0;
    background-color: var(--background-gray);
  }

  .container {
    font-family: "objektiv-mk2";
    color: var(--main-text);
    width: 100%;
  }
</style>
