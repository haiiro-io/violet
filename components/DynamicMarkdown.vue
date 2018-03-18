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
    staticTemplateRenders;
    renderFunc: string;
    staticRenderFuncs: string;

    render (h) {
      return this.templateRender ? this.templateRender() : h("div", "Rendering");
    }

    created () {
      this.templateRender = new Function (`return ${this.renderFunc}`)();
      this.staticTemplateRenders = new Function (`return ${this.staticRenderFuncs}`)();
      this.$options.staticRenderFns = this.staticTemplateRenders;
    }
  }
</script>
