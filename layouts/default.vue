<template>
  <div class="container">
    <a href="/"><haiiro-icon /></a>
    <nuxt/>
  </div>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "nuxt-class-component";

  import HaiiroIcon from "../components/HaiiroIcon.vue";

  @Component({ components: { HaiiroIcon } })
  export default class RootLayout extends Vue {
  }
</script>

<style lang="postcss">
  @import url("https://use.typekit.net/sff2rot.css");

  body {
    margin: 0;
    background-color: var(--skyhai);
  }

  .container {
    font-family: "objektiv-mk2";
    color: var(--konezumi);
    width: 100%;
  }
</style>

<style lang="postcss" scoped>
  .container a {
    width: 93px;
  }
</style>
