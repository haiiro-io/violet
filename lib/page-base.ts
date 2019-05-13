import { Component, Vue } from "nuxt-property-decorator";
import VueI18n from "vue-i18n";

@Component
export default class PageBase extends Vue {
  head (): { [key: string]: any } {
    return {
      title: this.pageTitle,
      meta: [
        { property: "og:url", content: this.ogUrl },
        { hid: "author", name: "author", content: this.$t("index.author") },
        { hid: "description", name: "description", property: "og:description", content: this.pageDescription },
        { hid: "og:title", property: "og:title", content: this.pageTitle },
        { hid: "og:image", property: "og:image", content: this.ogImage },
        { hid: "twitter:description", name: "twitter:description", content: this.pageDescription },
        { hid: "twitter:image", name: "twitter:image", content: this.ogImage }
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
