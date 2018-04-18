<template>
  <section class="contact">
    <h1>
      Contact Me
      <span class="workSelected-year">Say hello. Reaching out to me ☺</span>
    </h1>
    <form>
      <haiiro-button>
        Send
      </haiiro-button>
    </form>
  </section>
</template>

<script lang="ts">
  import VueI18n from "vue-i18n";
  import Component from "nuxt-class-component";
  import { Action, namespace } from "vuex-class";

  import { name as PixelsNamespace } from "~/store/modules/pixels";
  const PixelsAction = namespace(PixelsNamespace, Action);

  import PageBase from "~/lib/page-base";
  import HaiiroButton from "~/components/HaiiroButton.vue";

  @Component({
    components: { HaiiroButton }
  })
  export default class PageContact extends PageBase {
    @PixelsAction updateDefaultColors;

    mounted () {
      this.updateDefaultColors(
        ["#A7A7A7", "#CFCFCF","#D4D4D4", "#D4D4D4","#CFCFCF","#A7A7A7","#D4D4D4"]
      );
    }
  }
</script>

<style lang="postcss" scoped>
  @import "~/assets/styles/custom-properties.postcss";

  section.contact {
    @media (--narrow) {
      padding-top: 170px;
    }
  }

  h1 {
    text-align: center;
    font-size: 48px;
    line-height: 1.7;
    font-weight: bold;
    margin: 120px auto 120px;
    color: var(--konezumi);
    & > .workSelected-year {
      font-size: 18px;
      font-weight: normal;
      line-height: 1.7;
      display: block;
      margin-top: 20px;
      text-align: center;
      color: var(--nibihai);
    }
  }

  form {
    display: flex;
    justify-content: center;
  }

  .haiiroButton {
    margin: 0 auto;
    min-width: 240px;
    text-align: center;
  }

</style>
