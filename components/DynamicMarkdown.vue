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
