<script lang="ts">
  import Vue from "vue";
  import Component from "nuxt-class-component";

  import HaiiroIcon from "./HaiiroIcon.vue";
  import WorkMedia from "./WorkMedia.vue";
  import WorkButton from "./WorkButton.vue";

  @Component({
    props: ["renderFunc", "staticRenderFuncs"],
    components: {
      HaiiroIcon, WorkMedia, WorkButton
    }
  })
  export default class DynamicMarkdown extends Vue {
    templateRender;
    renderFunc: string;
    staticRenderFuncs: string;

    render (h) {
      return this.templateRender ? this.templateRender() : h("div", "Rendering");
    }

    created () {
      this.templateRender = new Function(this.renderFunc)();
      this.$options.staticRenderFns = new Function(this.staticRenderFuncs)();
    }
  }
</script>

<style lang="postcss" scoped>
  @import "../assets/styles/custom-properties.postcss";

  h2 {
    margin: 0 auto;
    padding: 120px 0 40px;
    text-align: center;
    font-weight: bold;
    font-size: 18px;
    line-height: 1.5;
    color: var(--konezumi);
  }
  h3 {
    margin: 0 auto;
    padding: 80px 0 40px;
    width: 66.7%;
    text-align: left;
    font-weight: normal;
    font-size: 16px;
    line-height: 1.5;
    color: var(--nibihai);
  }
  p {
    margin: 0 auto;
    width: 66.7%;
    font-weight: normal;
    font-size: 16px;
    line-height: 1.5;
    color: var(--konezumi);
  }

  .workMedia {
    padding: 40px 0;
  }

  .workMedia + .workMedia {
    margin-top: -60px;
  }

  p + p {
    margin-top: 24px;
  }

  h2:first-child,
  p:first-child,
  .workMedia:first-child {
    padding-top: 0;
  }

  .workMedia + h2 {
    padding-top: 80px;
  }

  h2 + .workMedia {
    padding-top: 0;
  }

  @media (--medium) {
    p, h3 {
      width: 83.3%;
    }
  }
  @media (--narrow) {
    h2, h3, p {
      width: 100%;
      padding-right: 20px;
      padding-left: 20px;
    }
    h2 {
      padding-top: 70px;
      font-size: 16px;
    }
    .workMedia + h2 {
      padding-top: 30px;
    }
  }
</style>
