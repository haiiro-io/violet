<template>
  <section>
    <h1>{{$t("index.greeting")}}</h1>
    <ul>
      <li>
        <nuxt-link to="/about">About</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/works/laughly">Laughly</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/works/signifiant">Signifiant</nuxt-link>
      </li>
    </ul>
  </section>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "nuxt-class-component";

@Component
  export default class extends Vue {
  }
</script>

<style lang="postcss">
</style>
