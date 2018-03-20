<template>
  <div class="container">
    <nuxt-link to="/">
      <haiiro-icon />
    </nuxt-link>
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
    beforeCreate () {
      try {
        Typekit.load({ async: true });
      } catch (e) {
      }
    }
  }
</script>

<style lang="postcss">
  body {
    margin: 0;
    background-color: var(--skyhai);
  }

  .container {
    font-family: "objektiv-mk2","ryo-gothic-plusn",sans-serif;
    color: var(--konezumi);
    width: 100%;
  }
</style>

<style lang="postcss" scoped>
  .container a {
    width: 93px;
  }
  svg.svgIcon {
    width: 30px;
    height: 30px;
    fill: var(--nibihai);
  }
</style>
