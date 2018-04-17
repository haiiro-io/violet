<template>
  <div class="workImg">
    <img
      class="workImg-image"
      :alt="alt || caption"
      :src="path"
    >
    <span
      class="workImg-caption"
      v-if="caption">
      {{ caption }}
    </span>
  </div>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "nuxt-class-component";

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
    font-size: 16px;
    line-height: 1.7;
    display: block;
    text-align: center;
    @media (--narrow) {
      font-size: 14px;
    }
  }
</style>
