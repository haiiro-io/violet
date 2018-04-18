<template>
  <section class="about">
    <div
      :style="bannerBackgroundStyle"
      class="banner">
      <span class="name">{{ $t("index.author") }}</span>
      <span class="title">{{ $t("about.job") }}</span>
    </div>
    <div class="outerMoat tagline">
      <span v-html="datas.html" />
      <dl>
        <dt>{{ $t("about.specialities") }}</dt>
        <dd
          v-for="speciality in datas.attributes.specialities"
          :key="speciality">
          {{ speciality }}
        </dd>
      </dl>
      <div class="supplementalLinks">
        <haiiro-button href="/resume.pdf">
          {{ $t("about.resume") }}
        </haiiro-button>
        <haiiro-button>
          {{ $t("about.contact") }}
        </haiiro-button>
      </div>
      <div class="careers">
        <span class="careersHeader">{{ $t("about.experience") }}</span>
        <div
          v-for="career in datas.attributes.careers"
          :key="career.employer"
          class="career">
          <div class="career-left">
            <span class="career-employer">
              <a
                v-if="career.link"
                :href="career.link"
                target="_blank">
                {{ career.employer }}
              </a>
              <span v-else>
                {{ career.employer }}
              </span>
            </span>
            <span class="career-title">{{ career.title }}</span>
          </div>
          <div class="career-right">
            {{ career.location }} / {{ career.period }}
          </div>
        </div>
      </div>
      <div class="avatar">
        <div
          :style="avatarImageStyle"
          class="avatar-icon" />
        <haiiro-button
          href="https://twitter.com/haiji505"
          target="_blank">
          <span class="emoji">🙌 </span>{{ $t("about.hello") }}
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

  import enData from "~/contents/en/about.md";
  import jaData from "~/contents/ja/about.md";

  @Component({
    components: {
      HaiiroButton
    }
  })
  export default class PageAbout extends PageBase {
    @PixelsAction updateDefaultColors;

    mounted () {
      this.updateDefaultColors();
    }

    get pageTitle (): VueI18n.LocaleMessage {
      return this.$t("about.title");
    }

    get bannerBackgroundStyle () {
      return {
        background: "url('/images/about/banner.jpg')",
        "background-repeat": "no-repeat",
        "background-size": "cover",
        "background-position": "center",
      };
    }

    get avatarImageStyle () {
      return {
        background: "url('/images/about/avatar.jpg')",
        "background-repeat": "no-repeat",
        "background-size": "contain"
      };
    }

    get datas () {
      return process.env.buildLocale === "ja" ? jaData : enData;
    }
  }
</script>

<style lang="postcss" scoped>
  @import "~/assets/styles/custom-properties.postcss";

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
    width: 66.7%;
    max-width: 793px;
    font-size: 16px;
    line-height: 1.7;
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
      width: 100%;
      margin-top: 70px;
      padding-right: 20px;
      padding-left: 20px;
    }
  }

  .haiiroButton {
    min-width: 240px;
    text-align: center;
  }

  .supplementalLinks {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: 120px;
    align-items: center;
    & .haiiroButton:last-child {
      margin-left: 20px;
    }
    @media (--narrow) {
      margin-top: 70px;
      flex-direction: column;
      & .haiiroButton:last-child {
        margin-top: 20px;
        margin-left: 0;
      }
    }
  }

  .careers {
    margin-top: 120px;
    @media (--narrow) {
      margin-top: 70px;
    }
  }
  .careersHeader {
    font-weight: bold;
    display: block;
    text-align: center;
    margin-bottom: 40px;
  }
  .career {
    height: 46px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-bottom: 2px solid var(--soba);
    @media (--narrow) {
      height: unset;
      flex-direction: column;
    }
  }
  .career + .career {
    margin-top: 20px;
  }
  .career-left {
    display: flex;
    flex-direction: row;
    @media (--narrow) {
      flex-direction: column;
    }
  }
  .career-employer {
    min-width: 175px;
    font-weight: bold;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    & a {
      color: var(--konezumi);
    }
    @media (--wide) {
      width: 300px;
    }
  }
  .career-title {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    margin-left: 15px;
    @media (--narrow) {
      margin: 5px 0;
      margin-left: unset;
    }
  }
  .career-left {
    display: flex;
  }
  .career-right {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    @media (--narrow) {
      margin-bottom: 20px;
    }
  }


  .avatar-icon {
    height: 100px;
    width: 100px;
    background-color: var(--soba);
    border-radius: 50px;
    margin: 120px auto 0;
    @media (--narrow) {
      margin-top: 70px;
    }
  }

  .avatar {
    text-align: center;
    & .haiiroButton {
      margin-top: 40px;
    }
  }
</style>
