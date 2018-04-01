<script lang="ts">
  import Vue from "vue";
  import Component from "nuxt-class-component";

  import HaiiroIcon from "./HaiiroIcon.vue";
  import WorkMedia from "./WorkMedia.vue";

  @Component({
    props: ["renderFunc", "staticRenderFuncs"],
    components: {
      HaiiroIcon, WorkMedia
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
    margin: 120px auto 40px;
    text-align: center;
    color: var(--konezumi);
    font-weight: bold;
    font-size: 18px;
  }
  h3 {
    width: 66.7%;
    text-align: left;
    margin: 80px auto 40px;
    font-size: 16px;
    color: var(--nibihai);
    font-weight: regular;
  }
  p {
    color: var(--konezumi);
    width: 66.7%;
    margin: 0 auto;
    font-size: 16px;
    line-height: 24px;
  }
  p + p {
    margin-top: 24px;
  }
  .workMedia {
    margin: 40px auto;
  }

  h2:first-child,
  p:first-child,
  .workMedia:first-child {
    margin-top: 0;
  }

  @media (--medium) {
    p, h3 {
      width: 83.3%;
    }
  }
  @media (--narrow) {
    p, h3 {
      width: 100%;
    }
    h2 {
      margin-top: 70px;
      font-size: 16px;
    }
  }
</style>
