import Vue from "vue";
import Component from "nuxt-class-component";
import VueI18n from "vue-i18n";

@Component
export default class PageBase extends Vue {
  head () {
    return {
      title: this.pageTitle,
      meta: [
        { name: "author", content: this.$t("index.author") },
        { name: "og:title", content: this.pageTitle },
        { name: "og:url", content: process.env.baseUrl },
        { name: "description", content: this.pageDescription, hid: "description" },
        { name: "og:description", content: this.pageDescription },
        { name: "twitter:description", content: this.pageDescription },
        { name: "og:image", content: this.ogImage },
        { name: "twitter:image", content: this.ogImage }
      ]
    };
  }

  get ogImage (): string {
    return `${process.env.baseUrl}/images/ogp_1200x630.jpg`;
  }

  get pageTitle (): VueI18n.LocaleMessage {
    return this.$t("index.title");
  }

  get pageDescription (): VueI18n.LocaleMessage {
    return this.$t("index.description");
  }
}
