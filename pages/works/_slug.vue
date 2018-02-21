<template>
  <div>
    Here's {{$route.params.slug}} work
    <div v-html="markdown"></div>
  </div>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "nuxt-class-component";
  import MarkdownIt from "markdown-it";

  import signifiant from "~/contents/works/signifiant.md";

  const works = [
    "signifiant"
  ];

  const markdownRender = new MarkdownIt();

  @Component
  export default class PageSelectedWork extends Vue {
    get markdown (): string {
      return markdownRender.render(signifiant);
    }

    validate ({ params }): boolean {
      return (works.indexOf(params.slug) > -1);
    }
  }
</script>

<style lang="postcss">
</style>
