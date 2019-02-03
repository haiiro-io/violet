import { Component, Vue } from "nuxt-property-decorator";
import VueI18n from "vue-i18n";

@Component
export default class PageBase extends Vue {
  head (): { [key: string]: any } {
    return {
      title: this.pageTitle,
      meta: [
        { name: "author", content: this.$t("index.author") },
        { name: "description", property: "og:description", content: this.pageDescription, hid: "description" },
        { property: "og:title", content: this.pageTitle },
        { property: "og:url", content: this.ogUrl },
        { property: "og:image", content: this.ogImage },
        { name: "twitter:description", content: this.pageDescription },
        { name: "twitter:image", content: this.ogImage }
      ]
    };
  }

  get ogUrl (): string {
    return process.env.baseUrl;
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
