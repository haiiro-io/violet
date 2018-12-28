<template>
  <div class="workImg">
    <img
      :alt="alt || caption"
      :src="path"
      class="workImg-image"
    >
    <span
      v-if="caption"
      class="workImg-caption"
    >
      {{ caption }}
    </span>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from "nuxt-property-decorator";

  @Component({
    props: {
      path: {
        type: String,
        required: true
      },
      caption: {
        type: String,
      },
      alt: {
        type: String
      }
    }
  })
  export default class WorkImg extends Vue {
  }
</script>

<style lang="postcss" scoped>
  @import "~/assets/styles/custom-properties.postcss";

  .workImg, .workImg-image {
    width: 100%;
  }

  .workImg-caption {
    margin-top: 20px;
    font-size: 14px;
    line-height: 1.7;
    display: block;
    text-align: center;
    color: var(--nibihai);
    @media (--narrow) {
      padding-right: 20px;
      padding-left: 20px;
    }
  }
</style>
