<template>
  <nuxt-link
    v-if="routerHref"
    :to="routerHref"
    class="haiiroButton"
  >
    <slot />
  </nuxt-link>
  <a
    v-else
    class="haiiroButton"
  >
    <slot />
  </a>
</template>

<script lang="ts">
  import { Component, Vue } from "nuxt-property-decorator";

  @Component({
    props: {
      routerHref: String
    }
  })
  export default class HaiiroButton extends Vue {
  }
</script>

<style lang="postcss" scoped>
  a {
    display: inline-block;
    line-height: 50px;
    padding: 0 30px;
    background-color: var(--skyhai);
    color: var(--konezumi);
    text-decoration: none;
    border: 2px solid var(--konezumi);
    border-radius: 2px;
    font-weight: bold;
    cursor: pointer;
    word-break: keep-all;
  }
  a:hover {
    color: white;
    background-color: var(--konezumi);
    transition: ease 0.5s;
  }
  a:active {
    border-color: var(--nibihai);
    background-color: var(--nibihai);
  }

  >>> .emoji {
    margin-right: 15px;
  }
</style>
