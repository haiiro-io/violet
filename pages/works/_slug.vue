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
  import laughly from "~/contents/works/laughly.md";

  const works = {
    signifiant,
    laughly
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
