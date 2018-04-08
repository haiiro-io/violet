<template>
  <header>
    <haiiro-icon
      :size="haiiroIconSize"
      @click="$router.push('/')"
    />
    <nav id="headerLinks">
      <nuxt-link
        to="/"
        :class="{ active: $route.path == '/' }">
        Work
      </nuxt-link>
      <nuxt-link
        to="/about"
        :class="{ active: $route.path == '/about' }">
        About
      </nuxt-link>
      <a :href="anotherLocale">
        <locale-switcher />
      </a>
    </nav>
  </header>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "nuxt-class-component";

  import HaiiroIcon from "~/components/HaiiroIcon.vue";
  import LocaleSwitcher from "~/components/LocaleSwitcher.vue";

  @Component({ components: { HaiiroIcon, LocaleSwitcher } })
  export default class HeaderNavigation extends Vue {
    haiiroIconSize: number = 0;

    mounted () {
      this.updateHaiiroIconSize();
      if (process.browser) {
        window.addEventListener("resize", this.updateHaiiroIconSize);
      }
    }

    beforeDestroy () {
      if (process.browser) {
        window.removeEventListener("resize", this.updateHaiiroIconSize);
      }
    }

    updateHaiiroIconSize () {
      this.haiiroIconSize = this.$el.clientWidth > 768 ? 30 : 22;
    }

    get anotherLocale (): string {
      return process.env.productionUrl[process.env.buildLocale === "en" ? "ja" : "en"] + this.$route.path;
    }
  }
</script>

<style lang="postcss" scoped>
  @import "../assets/styles/custom-properties.postcss";

  header {
    z-index: 10;
    top: 0;
    width: 100%;
    position: fixed;
    display: flex;
    justify-content: space-between;
    backdrop-filter: blur(2px);
  }
  .haiiroIcon {
    cursor: pointer;
    margin-top: 40px;
    margin-left: 40px;
    @media (--narrow) {
      margin-top: 20px;
      margin-left: 20px;
    }
  }

  #headerLinks {
    display: flex;
    margin-top: 20px;
    margin-right: 20px;
    & a {
      height: 36px;
      font-size: 16px;
      line-height: 36px;
      font-weight: bold;
      text-decoration: none;
      display: block;
      margin-right: 20px;
    }
    & a:last-child {
      margin-right: 0;
    }
    & a {
      color: var(--konezumi);
    }
    & a.active, & a:hover {
      color: var(--nibihai);
    }
  }
</style>
