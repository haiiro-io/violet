<template>
  <div class="workButton">
    <a
      :href="link"
      target="_blank">
      {{ label }}
    </a>
  </div>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "nuxt-class-component";

  @Component({
    props: {
      label: {
        type: String,
        required: true
      },
      link: {
        type: String,
        required: true
      }
    }
  })
  export default class WorkButton extends Vue {
  }
</script>

<style lang="postcss" scoped>
  @import "../assets/styles/custom-properties.postcss";

  .workButton {
    text-align: center;
    margin: 120px auto 0;
    @media (--narrow) {
      margin-top: 70px;
    }

    & a {
      display: inline-block;
      line-height: 50px;
      padding: 0 38px;
      background-color: var(--skyhai);
      color: var(--konezumi);
      text-decoration: none;
      border: 2px solid var(--konezumi);
      border-radius: 2px;
    }
    & a:hover {
      color: white;
      background-color: var(--konezumi);
      transition: ease 0.5s;
    }
  }
</style>
