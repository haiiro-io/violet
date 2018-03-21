<template>
  <div>
    {{ $route.params.slug }} @ {{ work.owner }}, {{ work.year }}
    <p>{{ work.description }}</p>
    <p>{{ work.colors.join(" / ") }}</p>
    <work-media name="main.jpg" />
    <dynamic-markdown
      :render-func="work.renderFunc"
      :static-render-funcs="work.staticRenderFuncs" />
  </div>
</template>

<script lang="ts">
  import VueI18n from "vue-i18n";
  import PageBase from "../../lib/page-base";
  import Component from "nuxt-class-component";
  import { Getter, Action, namespace } from "vuex-class";

  import DynamicMarkdown from "../../components/DynamicMarkdown.vue";
  import WorkMedia from "../../components/WorkMedia.vue";

  import { Work } from "../../store/modules/works";
  import { name as WorksNamespace } from "../../store/modules/works";
  import { name as PixelsNamespace } from "~/store/modules/pixels";
  const WorksGetter = namespace(WorksNamespace, Getter);
  const PixelsAction = namespace(PixelsNamespace, Action);

  @Component({
    components: { DynamicMarkdown, WorkMedia }
  })
  export default class PageSelectedWork extends PageBase {
    @WorksGetter pick;
    @PixelsAction setColors;

    mounted () {
      this.setColors(this.work.colors);
    }

    get pageTitle (): VueI18n.LocaleMessage {
      return this.$t("works.title", { name: this.work.title });
    }

    get ogImage (): string {
      return `${process.env.baseUrl}/images/works/${this.work.image.og || this.work.name + "_og.jpg"}`;
    }

    get work (): Work {
      const slug = this.$route.params.slug;
      return this.pick(slug);
    }

    get mainImageName (): string {
      return this.work.image.main || "main.jpg";
    }

    validate ({ store, params }): boolean {
      return !!(store.getters["works/pick"](params.slug));
    }
  }
</script>

<style lang="postcss">
</style>
