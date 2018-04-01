<template>
  <section class="workSelected">
    <work-media
      class="horizon"
      :name="mainImageName" />
    <div class="outerMoat">
      <h1>{{ work.title }}</h1>
      <span class="workSelected-year">{{ work.year }}</span>
      <p>{{ work.description }}</p>
      <dl class="workSelected-meta">
        <dt>Product Owner</dt>
        <dd>{{ work.owner }}</dd>
        <dt>Role</dt>
        <dd>{{ work.role }}</dd>
      </dl>
      <dynamic-markdown
        :render-func="work.renderFunc"
        :static-render-funcs="work.staticRenderFuncs" />
    </div>
  </section>
</template>

<script lang="ts">
  import mediumZoom from "medium-zoom";
  import VueI18n from "vue-i18n";
  import PageBase from "~/lib/page-base";
  import Component from "nuxt-class-component";
  import { Getter, Action, namespace } from "vuex-class";

  import DynamicMarkdown from "~/components/DynamicMarkdown.vue";
  import WorkMedia from "~/components/WorkMedia.vue";

  import { Work } from "~/store/modules/works";
  import { name as WorksNamespace } from "~/store/modules/works";
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
      mediumZoom(".outerMoat .workImg");
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

<style lang="postcss" scoped>
  section.workSelected {
    padding-top: 170px;
  }
  h1 {
    width: 100%;
    text-align: center;
    font-size: 48px;
    line-height: 54px;
    font-weight: bold;
    margin: 120px 0 20px;
  }
  .workSelected-year {
    font-size: 16px;
    line-height: 24px;
    display: block;
    margin: 0 auto 120px;
    text-align: center;
    color: var(--nibihai);
  }
  dl {
    width: 66.7%;
    margin: 120px auto;
  }
  dt {
    font-size: 16px;
    color: var(--nibihai);
    margin-bottom: 5px;
  }
  dd {
    color: var(--konezumi);
    font-size: 18px;
    line-height: 27px;
    margin-left: 0;
  }
  dd + dt {
    margin-top: 20px;
  }
  p {
    color: var(--konezumi);
    width: 66.7%;
    margin: 0 auto;
    font-size: 18px;
    line-height: 27px;
  }
</style>
