<template>
  <div class="container">
    <header-navigation />
    <form
      netlify
      name="contact"
      netlify-honeypot="bot-field"
      style="display: none">
      <input
        type="hidden"
        name="form-name"
        value="contact">
      <input
        type="text"
        name="sender">
      <input
        type="email"
        name="email">
      <textarea
        id="hiddenTextArea"
        name="message" />
      <div
        netlify-recaptcha
        ref="recaptcha" />
    </form>
    <nuxt/>
    <footer>
      <div id="exposures">
        <div class="mainExposures">
          <a
            v-for="exp in mainExposures"
            :key="exp[0]"
            :href="exp[1]"
            target="_blank">
            <svg-icon :name="exp[0]" />
          </a>
        </div>
        <div class="additionalExposures">
          <a
            v-for="exp in additionalExposures"
            :key="exp[0]"
            :href="exp[1]"
            target="_blank">
            <svg-icon :name="exp[0]" />
          </a>
        </div>
      </div>
      <div id="copyright">
        <span>{{ $t('root.copyright', { year: new Date().getFullYear() }) }} /
          <a
            target="_blank"
            href="https://github.com/haiiro-io/violet">
            Source and Licenses
          </a>
        </span>
        <i18n
          path="root.made_by.message"
          tag="span">
          <nuxt-link
            to="/about"
            place="namika">
            {{ $t("root.made_by.namika") }}
          </nuxt-link>
          <a
            href="https://hmsk.me"
            target="_blank"
            place="kengo">
            {{ $t("root.made_by.kengo") }}
          </a>
        </i18n>
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "nuxt-class-component";

  import HeaderNavigation from "~/components/HeaderNavigation.vue";
  import SvgIcon from "~/components/SvgIcon.vue";

  declare const Typekit: any;

  @Component({ components: { HeaderNavigation, SvgIcon } })
  export default class RootLayout extends Vue {

    beforeCreate () {
      try {
        Typekit.load({ async: true });
      } catch (e) {
      }
    }

    get mainExposures () {
      return [
        ["dribbble", "https://dribbble.com/haiji505"],
        ["instagram", "https://www.instagram.com/haiji505/"],
        ["linkedin", "https://www.linkedin.com/in/namika-hamasaki/"],
        ["github", "https://github.com/haiji505"],
        ["twitter", "https://twitter.com/haiji505"]
      ];
    }

    get additionalExposures () {
      return [
        ["500px", "https://500px.com/haiji505"],
        ["behance", "https://www.behance.net/haiji505"],
        ["medium", "https://medium.com/@haiji505"],
        ["hatenablog", "http://blog.haiji.co/"],
        ["facebook", "https://www.facebook.com/haiji505"],
        ["gift", "https://www.amazon.co.jp/registry/wishlist/31FH6CO5B6F8W"]
      ];
    }
  }
</script>

<style lang="postcss">
  @import "~/assets/styles/custom-properties.postcss";

  * {
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
    user-select: text;
  }

  body {
    background-color: var(--skyhai);
  }

  .medium-zoom-overlay {
    z-index: 15;
  }
  .medium-zoom-image {
    z-index: 20;
  }

  .container {
    font-family: "objektiv-mk2", "ryo-gothic-plusn", sans-serif;
    color: var(--konezumi);
    width: 100%;

    & .outerMoat {
      width: 83%;
      margin: 0 auto;
      @media (--narrow) {
        width: 100%;
      }
    }
  }
</style>

<style lang="postcss" scoped>
  @import "../assets/styles/custom-properties.postcss";

  .container a {
  }

  footer {
    margin-top: 120px;
    padding-top: 70px;
    border-top: 2px solid var(--soba);
    @media (--narrow) {
      margin-top: 70px;
    }
  }

  .mainExposures, .additionalExposures {
    display: flex;
    justify-content: center;
    & svg {
      margin: 0 10px;
    }
  }

  .additionalExposures {
    margin-top: 40px;
  }

  #copyright {
    font-size: 12px;
    text-align: center;
    color: var(--nibihai);
    font-size: 12px;
    line-height: 18px;
    margin-top: 70px;
    margin-bottom: 40px;
    & span {
      display: block;
    }
    & a {
      color: var(--nibihai);
    }
  }

  svg.svgIcon {
    width: 30px;
    height: 30px;
    fill: var(--nibihai);
  }

  svg.svgIcon:hover {
    fill: var(--konezumi);
  }
</style>
