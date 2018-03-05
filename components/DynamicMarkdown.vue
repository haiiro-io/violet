<script lang="ts">
  import Vue from "vue";
  import VueWithCompiler from "vue/dist/vue.esm";
  import Component from "nuxt-class-component";

  import HaiiroIcon from "./HaiiroIcon.vue";

  import { Watch } from "vue-property-decorator";

  import MarkdownIt from "markdown-it";
  const markdownRender = new MarkdownIt({
    html: true
  });

  @Component({
    props: ["markdown"],
    components: {
      HaiiroIcon
    }
  })
  export default class DynamicMarkdown extends Vue {
    templateRender;
    markdown: string;

    render (h) {
      if (this.templateRender) {
        return this.templateRender();
      } else {
        return h("div", "Looading");
      }
    }

    created () {
      const compiled = VueWithCompiler.compile(`<div>${markdownRender.render(this.markdown)}</div>`);
      // https://forum.vuejs.org/t/vue-compile-what-is-staticrenderfns-render-vs-staticrenderfns/3950/7
      // https://jsfiddle.net/Linusborg/1zdzu7k1/
      this.templateRender = compiled.render;
      this.$options.staticRenderFns = [];
      for (const staticRenderFunction of compiled.staticRenderFns) {
        this.$options.staticRenderFns.push(staticRenderFunction);
      }
    }
  }
</script>
