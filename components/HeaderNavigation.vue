<template>
  <header>
    <nuxt-link to="/">
      <haiiro-icon :size="haiiroIconSize" />
    </nuxt-link>
    <div id="headerLinks">
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
      <a
        :href="anotherLocale"
        target="_blank">
        A/あ
      </a>
    </div>
  </header>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "nuxt-class-component";

  import HaiiroIcon from "~/components/HaiiroIcon.vue";

  @Component({ components: { HaiiroIcon } })
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
      return process.env.productionUrl[process.env.buildLocale === "en" ? "ja" : "en"];
    }
  }
</script>

<style lang="postcss" scoped>
  @import "../assets/styles/custom-properties.postcss";

  header {
    top: 0;
    width: 100%;
    position: fixed;
    padding: 40px 40px 0 40px;
    display: flex;
    justify-content: space-between;
    @media (--narrow) {
      padding: 20px 0 0 20px;
    }
  }

  #headerLinks {
    display: flex;
    & a {
      height: 25px;
      font-size: 16px;
      font-weight: bold;
      color: var(--konezumi);
      text-decoration: none;
      display: block;
      margin-right: 20px;
    }
    & a.active {
      border-bottom: 2px solid var(--konezumi);
    }
    & a:hover {
      color: var(--nibihai);
    }
    & a.active:hover {
      border-bottom: 2px solid var(--nibihai);
    }
    & a:last-child {
      margin-right: 0;
    }
  }
</style>
