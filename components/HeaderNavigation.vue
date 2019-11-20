<template>
  <header>
    <haiiro-icon
      :size="haiiroIconSize"
      @click="$router.push('/')"
    />
    <nav id="headerLinks">
      <nuxt-link
        :class="{ active: $route.path == '/', hide: !showNavigation }"
        to="/"
      >
        Work
      </nuxt-link>
      <nuxt-link
        :class="{ active: $route.path == '/about', hide: !showNavigation }"
        to="/about"
      >
        About
      </nuxt-link>
      <locale-switcher />
    </nav>
  </header>
</template>

<script lang="ts">
  import { Component, Vue } from "nuxt-property-decorator";

  import HaiiroIcon from "~/components/HaiiroIcon.vue";
  import LocaleSwitcher from "~/components/LocaleSwitcher.vue";

  @Component({ components: { HaiiroIcon, LocaleSwitcher } })
  export default class HeaderNavigation extends Vue {
    haiiroIconSize = 0;
    showNavigation = false;

    mounted (): void {
      this.updateHaiiroIconSize();
      if (process.browser) {
        window.addEventListener("resize", this.updateHaiiroIconSize);
      }
      setTimeout(() => {
        this.showNavigation = true;
      }, 1000);
    }

    beforeDestroy (): void {
      if (process.browser) {
        window.removeEventListener("resize", this.updateHaiiroIconSize);
      }
    }

    updateHaiiroIconSize (): void {
      this.haiiroIconSize = this.$el.clientWidth > 768 ? 30 : 22;
    }
  }
</script>

<style lang="postcss" scoped>
  @import "~/assets/styles/custom-properties.postcss";

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
    margin: 40px;
    @media (--narrow) {
      margin: 20px;
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
      opacity: 1;
      transition: opacity ease 0.75s;
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
    & a.hide {
      opacity: 0;
    }
  }
</style>
