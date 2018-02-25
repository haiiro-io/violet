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
  import { Getter, namespace } from "vuex-class";
  import { name as WorksNamespace } from "../../store/modules/works";
  const WorksGetter = namespace(WorksNamespace, Getter);
  const markdownRender = new MarkdownIt();

  @Component
  export default class PageSelectedWork extends Vue {
    @WorksGetter pick;
    get markdown (): string {
      return markdownRender.render(this.pick(this.$route.params.slug).body);
    }

    validate ({ store, params }): boolean {
      return !!(store.getters["works/pick"](params.slug));
    }
  }
</script>

<style lang="postcss">
</style>
