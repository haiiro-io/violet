<template>
  <section class="workSelected">
    <work-media
      class="horizon"
      :name="mainImageName" />
    <div class="outerMoat">
      <h1>
        {{ work.title }}
        <span class="workSelected-year">{{ work.year }}</span>
      </h1>
      <p>{{ work.description }}</p>
      <dl class="workSelected-meta">
        <dt>Product Owner:</dt>
        <dd>{{ work.owner }}</dd>
        <dt>Role:</dt>
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
  @import "../../assets/styles/custom-properties.postcss";

  section.workSelected {
    padding-top: 170px;
  }

  h1 {
    text-align: center;
    font-size: 48px;
    line-height: 1.4;
    font-weight: bold;
    margin: 120px auto 120px;
    color: var(--konezumi);
    & > .workSelected-year {
      font-size: 16px;
      font-weight: normal;
      line-height: 24px;
      display: block;
      margin-top: 20px;
      text-align: center;
      color: var(--nibihai);
    }
  }

  p {
    color: var(--konezumi);
    width: 66.7%;
    margin: 0 auto;
    font-size: 16px;
    line-height: 24px;
  }

  dl {
    width: 66.7%;
    margin: 40px auto 120px;
    font-size: 16px;
    line-height: 1.5;
    & > dt {
      color: var(--nibihai);
      margin-bottom: 5px;
    }
    & > dd {
      color: var(--konezumi);
      margin-left: 0;
    }
    & > dd + dt {
      margin-top: 20px;
    }
  }

  @media (--medium) {
    p, dl {
      width: 83.3%;
    }
  }
  @media (--narrow) {
    h1, p, dl {
      width: 100%;
      padding: 0 20px;
    }
    h1 {
      font-size: 30px;
      margin: 70px auto;
      & > .workSelected-year {
        margin-top: 10px;
      }
    }
    dl {
      margin-bottom: 70px;
    }
  }
</style>
