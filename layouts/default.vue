<template>
  <div class="container">
    <header>
      <nuxt-link to="/">
        <haiiro-icon :size="haiiroIconSize" />
      </nuxt-link>
    </header>
    <nuxt/>
    <svg-icon name="dribbble" />
    <svg-icon name="instagram" />
    <svg-icon name="linkedin" />
    <svg-icon name="github" />
    <svg-icon name="twitter" />
    <svg-icon name="500px" />
    <svg-icon name="behance" />
    <svg-icon name="medium" />
    <svg-icon name="hatenablog" />
    <svg-icon name="facebook" />
    <svg-icon name="amazon" />
    <span v-t="{ path: 'root.copyright', args: { year: new Date().getFullYear() } }" />
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
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "nuxt-class-component";

  import HaiiroIcon from "../components/HaiiroIcon.vue";
  import SvgIcon from "../components/SvgIcon.vue";

  declare const Typekit: any;

  @Component({ components: { HaiiroIcon, SvgIcon } })
  export default class RootLayout extends Vue {
    haiiroIconSize: number = 0;

    beforeCreate () {
      try {
        Typekit.load({ async: true });
      } catch (e) {
      }
    }

    mounted () {
      this.updateHaiiroIconSize();
      if (process.browser) {
        window.addEventListener("resize", this.updateHaiiroIconSize);
      }
    }

    updateHaiiroIconSize () {
      this.haiiroIconSize = this.$el.clientWidth > 768 ? 30 : 22;
    }

    beforeDestroy () {
      if (process.browser) {
        window.removeEventListener("resize", this.updateHaiiroIconSize);
      }
    }
  }
</script>

<style lang="postcss">
  @import "../assets/styles/custom-properties.postcss";

  body {
    margin: 0;
    background-color: var(--skyhai);
  }

  .container {
    font-family: "objektiv-mk2", "ryo-gothic-plusn", sans-serif;
    color: var(--konezumi);
    width: 100%;
  }
</style>

<style lang="postcss" scoped>
  @import "../assets/styles/custom-properties.postcss";

  header {
    top: 0;
    width: 100%;
    position: fixed;
    padding: 40px 40px 0 40px;
    @media (--narrow) {
      padding: 20px 0 0 20px;
    }
  }

  .container a {
    width: 93px;
  }
  svg.svgIcon {
    width: 30px;
    height: 30px;
    fill: var(--nibihai);
  }
</style>
