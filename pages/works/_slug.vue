<template>
  <div>
    Here's {{$route.params.slug}} work
    <p>{{markdown}}</p>
  </div>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "nuxt-class-component";

  import signifiant from "~/contents/works/signifiant.md";

  const works = [
    "signifiant"
  ];

  @Component
  export default class PageSelectedWork extends Vue {
    get markdown (): string {
      return signifiant;
    }

    fetch ({ redirect, params }): void {
      if (works.indexOf(params.slug) === -1) {
        return redirect("/");
      }
    }
  }
</script>

<style lang="postcss">
</style>
