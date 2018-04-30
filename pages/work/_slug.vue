<template>
  <section class="workSelected">
    <div
      class="workSelected-horizontalImage"
      v-lazy:background-image="mainImageUrl" />
    <div class="outerMoat">
      <h1>
        {{ work.title }}
        <span class="workSelected-year">{{ work.year }}</span>
      </h1>
      <p>{{ work.description }}</p>
      <dl class="workSelected-meta">
        <dt>{{ $t("work.product_owner") }}</dt>
        <dd>{{ work.owner }}</dd>
        <dt>{{ $t("work.role") }}</dt>
        <dd>{{ work.role }}</dd>
      </dl>
      <dynamic-markdown
        :render-func="work.renderFunc"
        :static-render-funcs="work.staticRenderFuncs" />
      <div id="relatedWorks">
        <span class="relatedWorks-header">{{ $t("work.see_more") }}</span>
        <div class="relatedWorks-cards">
          <card
            v-for="relatedWork in relatedWorks"
            :key="relatedWork.name"
            :work="relatedWork" />
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
  import mediumZoom from "medium-zoom";
  import VueI18n from "vue-i18n";
  import PageBase from "~/lib/page-base";
  import Component from "nuxt-class-component";
  import { Getter, Action, namespace } from "vuex-class";

  import DynamicMarkdown from "~/components/Work/DynamicMarkdown.vue";
  import WorkMedia from "~/components/Work/WorkMedia.vue";
  import Card from "~/components/Card.vue";

  import { Work } from "~/store/modules/work";
  import { name as WorksNamespace } from "~/store/modules/work";
  import { name as PixelsNamespace } from "~/store/modules/pixels";
  const WorksGetter = namespace(WorksNamespace, Getter);
  const PixelsAction = namespace(PixelsNamespace, Action);

  @Component({
    components: { DynamicMarkdown, WorkMedia, Card }
  })
  export default class PageSelectedWork extends PageBase {
    @WorksGetter pick;
    @PixelsAction updateDefaultColors;

    mounted () {
      this.updateDefaultColors(this.work.colors);
      mediumZoom(".workImg-image", {
        background: "#DFE0E0"
      });
    }

    get pageTitle (): VueI18n.LocaleMessage {
      return this.$t("work.title", { name: this.work.title });
    }

    get ogImage (): string {
      return `${process.env.baseUrl}/images/work/${this.work.image.og || this.work.name + "_og.jpg"}`;
    }

    get work (): Work {
      const slug = this.$route.params.slug;
      return this.pick(slug);
    }

    get mainImageUrl (): string {
      return `/images/work/${this.$route.params.slug}_${this.work.image.main || "main.jpg"}`;
    }

    get relatedWorks (): Work[] {
      return this.work.related.map(related => this.pick(related)).filter(w => !!w);
    }

    validate ({ store, params }): boolean {
      return !!(store.getters["work/pick"](params.slug));
    }
  }
</script>

<style lang="postcss" scoped>
  @import "~/assets/styles/custom-properties.postcss";

  section.workSelected {
    @media (--narrow) {
      padding-top: 170px;
    }
  }

  .workSelected-horizontalImage {
    width: 100%;
    position: relative;
    height: 0;
    padding-bottom: 50%;
    background-size: contain, cover;
    background-repeat: no-repeat;
    background-color: var(--soba);
    transition: all ease .75s;
    &[lazy='loaded'] {
      background-color: unset;
    }
  }

  h1 {
    text-align: center;
    font-size: 48px;
    line-height: 1.7;
    font-weight: bold;
    margin: 120px auto 120px;
    color: var(--konezumi);
    word-break: keep-all;
    & > .workSelected-year {
      font-size: 18px;
      font-weight: normal;
      line-height: 1.7;
      display: block;
      margin-top: 20px;
      text-align: center;
      color: var(--nibihai);
    }
  }

  p {
    color: var(--konezumi);
    width: 66.7%;
    max-width: 793px;
    margin: 0 auto;
    font-size: 18px;
    line-height: 1.7;
  }

  dl {
    width: 66.7%;
    max-width: 793px;
    margin: 40px auto 120px;
    font-size: 18px;
    line-height: 1.7;
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
    h1 {
      & > .workSelected-year {
        font-size: 16px;
      }
    }
    p, dl {
      width: 83.3%;
      font-size: 16px;
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
        font-size: 16px;
      }
    }
    dl {
      margin-bottom: 70px;
    }
    p, dl {
      font-size: 16px;
    }
  }

  #relatedWorks {
    margin-top: 120px;
    @media (--narrow) {
      padding: 0 20px;
      margin-top: 70px;
    }
  }

  .relatedWorks-header {
    font-size: 40px;
    margin-bottom: 40px;
    line-height: 1.7;
    font-weight: bold;
    display: block;
    text-align: center;
    color: var(--nibihai);
    @media (--narrow) {
      font-size: 32px;
    }
  }

  .relatedWorks-cards {
    display: grid;
    grid-template-columns: repeat(3, 4fr);
    grid-column-gap: 1.66%;
    grid-row-gap: 100px;
    @media (--medium) {
      grid-template-columns: repeat(2, 6fr);
      grid-column-gap: 2.63%;
    }
    @media (--narrow) {
      grid-template-columns: repeat(1, 12fr);
      grid-column-gap: 0;
      grid-row-gap: 40px;
    }
  }
</style>
