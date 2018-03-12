import Vue from "vue";
import Component from "nuxt-class-component";

@Component
export default class PageBase extends Vue {
  head () {
    return {
      meta: [
        { name: "og:image", content: this.ogImage },
        { name: "twitter:image", content: this.ogImage }
      ]
    };
  }

  get ogImage (): string {
    return `${process.env.baseUrl}/images/ogp_1200x630.jpg`;
  }
}
