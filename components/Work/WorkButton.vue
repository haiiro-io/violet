<template>
  <div class="workButton">
    <haiiro-button
      :href="link"
      target="_blank"
    >
      {{ label }}
    </haiiro-button>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from "nuxt-property-decorator";

  import HaiiroButton from "~/components/HaiiroButton.vue";

  @Component({
    components: { HaiiroButton },
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
  @import "~/assets/styles/custom-properties.postcss";

  .workButton {
    text-align: center;
    margin: 120px auto 0;
    @media (--narrow) {
      margin-top: 70px;
    }
  }
</style>
