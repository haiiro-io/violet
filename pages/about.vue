<template>
  <section class="about">
    <div
      :style="bannerBackgroundStyle"
      class="banner">
      <span class="name">Namika Hamasaki</span>
      <span class="title">Product Designer</span>
    </div>
    <div class="outerMoat tagline">
      <p>{{ tagline }}</p>
      <dl>
        <dt>Specialities:</dt>
        <dd>User interface design</dd>
        <dd>Branding for startup companies</dd>
        <dd>Event planning and digital promotion</dd>
      </dl>
      <div class="supplementalLinks">
        <haiiro-button href="/resume.pdf">
          Download Resume
        </haiiro-button>
        <haiiro-button>
          Contact Me
        </haiiro-button>
      </div>
      <div class="careers">
        Experience
        <div
          v-for="career in careers"
          :key="career.employer"
          class="career">
          <span class="career-employer">{{ career.employer }}</span>
          <span class="career-title">{{ career.title }}</span>
          <span class="career-location">{{ career.location }}</span>
          <span class="career-period">{{ career.period }}</span>
        </div>
      </div>
      <div class="avatar">
        <div
          :style="avatarImageStyle"
          class="avatar-icon" />
        <haiiro-button
          href="https://twitter.com/haiji505"
          target="_blank">
          <span class="emoji">🙌 </span>Say Hello
        </haiiro-button>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
  import VueI18n from "vue-i18n";
  import Component from "nuxt-class-component";
  import { Action, namespace } from "vuex-class";

  import PageBase from "~/lib/page-base";
  import HaiiroButton from "~/components/HaiiroButton.vue";

  import { name as PixelsNamespace } from "~/store/modules/pixels";
  const PixelsAction = namespace(PixelsNamespace, Action);

  import banner from "~/assets/images/about_banner.jpg";
  import avatar from "~/assets/images/about_avatar.jpg";

  import enData from "~/contents/en/about.md";
  import jaData from "~/contents/ja/about.md";

  @Component({
    components: {
      HaiiroButton
    }
  })
  export default class PageAbout extends PageBase {
    @PixelsAction setDefaultColors;

    mounted () {
      this.setDefaultColors();
    }

    get pageTitle (): VueI18n.LocaleMessage {
      return this.$t("about.title");
    }

    get bannerBackgroundStyle () {
      return {
        background: `url(${banner})`,
        "background-repeat": "no-repeat",
        "background-size": "cover",
        "background-position": "center",
      };
    }

    get avatarImageStyle () {
      return {
        background: `url(${avatar})`,
        "background-repeat": "no-repeat",
        "background-size": "contain"
      };
    }

    get tagline () {
      return process.env.buildLocale === "ja" ? jaData.body : enData.body;
    }

    get careers () {
      return process.env.buildLocale === "ja" ? jaData.attributes.careers : enData.attributes.careers;
    }
  }
</script>

<style lang="postcss" scoped>
  @import "../assets/styles/custom-properties.postcss";

  section.about {
  }

  .banner {
    display: flex;
    flex-direction: column;
    width: 100%;
    background-color: var(--soba);
    height: 56.25vw;
    align-items: center;
    justify-content: center;
    @media (--narrow) {
      height: 133.33vw;
    }
    @media (--wide) {
      height: 50.00vw;
    }
    & span {
      display: block;
    }
  }

  span.name {
    color: white;
    font-size: 30px;
    line-height: 1.8;
    font-weight: bold;
  }
  span.title {
    font-size: 14px;
    line-height: 24px;
    font-weight: normal;
    color: var(--nibihai);
  }

  .tagline {
    font-size: 16px;
    line-height: 1.5;
    margin-top: 120px;
    & dl {
      margin-top: 40px;
      & dt {
        color: var(--nibihai);
        margin-bottom: 20px;
      }
      & dd {
        display: list-item;
        list-style-position: inside;
        -webkit-margin-start: 0;
      }
      & dd + dd {
        margin-top: 1.0em;
      }
    }
    @media (--narrow) {
      margin-top: 70px;
      padding-right: 20px;
      padding-left: 20px;
    }
  }

  .supplementalLinks {
    display: flex;
    justify-content: center;
    margin-top: 120px;
    & .haiiroButton:last-child {
      margin-left: 20px;
    }
  }

  .careers {
    margin-top: 120px;
  }

  .avatar-icon {
    height: 100px;
    width: 100px;
    background-color: var(--soba);
    border-radius: 50px;
    margin: 120px auto 0;
  }

  .avatar {
    text-align: center;
    & .haiiroButton {
      margin-top: 40px;
    }
  }
</style>
