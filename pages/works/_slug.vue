<template>
  <div>
    {{ $route.params.slug }} @ {{ work.owner }}, {{ work.year }}
    <p>{{ work.description }}</p>
    <p>{{ work.colors.join(" / ") }}</p>
    <div v-html="markdown"/>
  </div>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "nuxt-class-component";
  import MarkdownIt from "markdown-it";
  import { Getter, namespace } from "vuex-class";
  import { name as WorksNamespace } from "../../store/modules/works";
  import Work from "../../lib/work";
  const WorksGetter = namespace(WorksNamespace, Getter);
  const markdownRender = new MarkdownIt();

  @Component
  export default class PageSelectedWork extends Vue {
    @WorksGetter pick;

    get work (): Work {
      const slug = this.$route.params.slug;
      return this.pick(slug);
    }

    get markdown (): string {
      return markdownRender.render(this.work.body);
    }

    validate ({ store, params }): boolean {
      return !!(store.getters["works/pick"](params.slug));
    }
  }
</script>

<style lang="postcss">
</style>
