<template>
  <div>
    Here's {{ $route.params.slug }} work
    <div v-html="markdown"/>
  </div>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "nuxt-class-component";
  import MarkdownIt from "markdown-it";

  import signifiant from "~/contents/works/en/signifiant.md";
  import laughly from "~/contents/works/en/laughly.md";

  const works = {
    signifiant: signifiant.body,
    laughly: laughly.body
  };

  const markdownRender = new MarkdownIt();

  @Component
  export default class PageSelectedWork extends Vue {
    get markdown (): string {
      return markdownRender.render(works[this.$route.params.slug]);
    }

    validate ({ params }): boolean {
      return (Object.keys(works).indexOf(params.slug) > -1);
    }
  }
</script>

<style lang="postcss">
</style>
