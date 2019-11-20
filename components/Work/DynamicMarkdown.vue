<template>
  <component :is="markdownContent" />
</template>

<script lang="ts">
  import { Component, Vue } from "nuxt-property-decorator";

  import WorkMedia from "./WorkMedia.vue";
  import WorkButton from "./WorkButton.vue";

  @Component({
    props: {
      name: String,
      lang: String
    }
  })
  export default class DynamicMarkdown extends Vue {
    lang: string;
    name: string;
    markdownContent = null;

    created (): void {
      this.markdownContent = (): Promise<any> => import(`~/contents/${this.lang}/work/${this.name}.md`).then((fmd) => {
        return {
          extends: fmd.vue.component,
          components: { WorkMedia, WorkButton }
        };
      });
    }
  }
</script>

<style lang="postcss" scoped>
  @import "~/assets/styles/custom-properties.postcss";

  .dmd >>> h2 {
    margin: 0 auto;
    padding: 120px 0 40px;
    text-align: center;
    font-weight: bold;
    font-size: 20px;
    line-height: 1.7;
    color: var(--konezumi);
  }

  .dmd >>> h3 {
    margin: 0 auto;
    padding: 80px 0 40px;
    width: 66.7%;
    max-width: 793px;
    text-align: left;
    font-weight: normal;
    font-size: 18px;
    line-height: 1.7;
    color: var(--nibihai);
  }

  .dmd >>> p {
    margin: 0 auto;
    width: 66.7%;
    max-width: 793px;
    font-weight: normal;
    font-size: 18px;
    line-height: 1.7;
    color: var(--konezumi);

    & a {
      color: var(--konezumi);
    }

    & a:active,
    & a:hover {
      color: var(--nibihai);
    }
  }

  .dmd >>> ol, .dmd >>> ul {
    margin: 0 auto;
    padding: 20px 0;
    width: 66.7%;
    max-width: 793px;
    font-size: 18px;
    list-style-position: inside;
    -webkit-padding-start: 0;

    & > li > ol,
    & > li > ul {
      width: 100%;
      margin: 0;
      padding-left: 20px;
    }

    & > li {
      padding-left: 1.0em;
      text-indent: -1.0em;
      line-height: 1.7;
    }

    & > li + li {
      margin-top: 1.0em;
    }
  }

  .dmd >>> .workMedia {
    max-width: 1080px;
    margin-right: auto;
    margin-left: auto;
    padding: 120px 0;

    &.workMedia--shrink {
      width: 66.7%;
      max-width: 793px;
    }
  }

  .dmd >>> .workMedia + .dmd >>> .workMedia {
    margin-top: -220px;
  }

  .dmd >>> p + .dmd >>> p {
    margin-top: 24px;
  }

  .dmd >>> h2:first-child,
  .dmd >>> p:first-child,
  .dmd >>> .workMedia:first-child {
    padding-top: 0;
  }

  .dmd >>> .workMedia + .dmd >>> h2 {
    padding-top: 80px;
  }

  .dmd >>> ol + .dmd >>> .workMedia,
  .dmd >>> ul + .dmd >>> .workMedia {
    padding-top: 20px;
  }

  .dmd >>> ol + .dmd >>> h2,
  .dmd >>> ul + .dmd >>> h2 {
    padding-top: 100px;
  }

  .dmd >>> ol + .dmd >>> h3,
  .dmd >>> ul + .dmd >>> h3 {
    padding-top: 60px;
  }

  .dmd >>> h2 + .dmd >>> .workMedia,
  .dmd >>> h3 + .dmd >>> .workMedia,
  .dmd >>> h2 + .dmd >>> h3,
  .dmd >>> .workMedia + .dmd >>> ol,
  .dmd >>> .workMedia + .dmd >>> ul,
  .dmd >>> h3 + .dmd >>> ol,
  .dmd >>> h3 + .dmd >>> ul,
  .dmd >>> h2 + .dmd >>> ol,
  .dmd >>> h2 + .dmd >>> ul {
    padding-top: 0;
  }

  @media (--medium) {
    .dmd >>> h2 {
      font-size: 18px;
    }

    .dmd >>> p,
    .dmd >>> h3,
    .dmd >>> ol,
    .dmd >>> ul {
      width: 83.3%;
      max-width: 793px;
      font-size: 16px;
    }

    .dmd >>> .workMedia {
      padding: 80px 0;
    }

    .dmd >>> .workMedia + .dmd >>> .workMedia {
      margin-top: -140px;
    }
  }

  @media (--narrow) {
    .dmd >>> h2,
    .dmd >>> h3,
    .dmd >>> p,
    .dmd >>> ol,
    .dmd >>> ul {
      width: 100%;
      padding-right: 20px;
      padding-left: 20px;
    }

    .dmd >>> h2 {
      padding-top: 70px;
      font-size: 16px;
    }

    .dmd >>> h3 {
      padding-top: 40px;
      padding-bottom: 20px;
    }

    .dmd >>> h3,
    .dmd >>> p,
    .dmd >>> ol,
    .dmd >>> ul {
      font-size: 16px;
    }

    .dmd >>> .workMedia {
      padding: 40px 0;
    }

    .dmd >>> .workMedia + .dmd >>> .workMedia {
      margin-top: -60px;
    }

    .dmd >>> .workMedia + .dmd >>> h2,
    .dmd >>> .workMedia + .dmd >>> h3 {
      padding-top: 30px;
    }

    .dmd >>> ol + .dmd >>> h2,
    .dmd >>> ul + .dmd >>> h2 {
      padding-top: 50px;
    }
    .dmd >>> ol + .dmd >>> h3,
    .dmd >>> ul + .dmd >>> h3 {
      padding-top: 20px;
    }
  }
</style>
