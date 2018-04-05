<template>
  <section class="about">
    <div
      :style="bannerBackgroundStyle"
      class="banner">
      <span class="name">Namika Hamasaki</span>
      <span class="title">Product Designer</span>
    </div>
    <div class="outerMoat tagline">
      <p>
        I’m a product designer with experience in web design and promotional planning at an advertising agency. I have designed user interfaces and brands for clients like Google, Sony Interactive Entertainment (PlayStation), and Sony Music Entertainment. And I love video games!
      </p>
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
      };
    }

    get avatarImageStyle () {
      return {
        background: `url(${avatar})`,
        "background-repeat": "no-repeat",
        "background-size": "contain"
      };
    }

    get careers () {
      return [
        {
          employer: "Tradecraft",
          title: "Product Designer",
          location: "San Francisco, CA",
          period: "2017 - 2018"
        },
        {
          employer: "Freelance",
          title: "UX/UI Designer",
          location: "Remote",
          period: "2016 - 2017"
        },
        {
          employer: "LiB",
          title: "UX/UI Designer",
          location: "Tokyo, Japan",
          period: "2016 - 2017"
        },
        {
          employer: "SIX",
          title: "Interactive Planner & UI Designer",
          location: "Tokyo, Japan",
          period: "2013 - 2015"
        },
        {
          employer: "Hakuhodo",
          title: "Interactive Planner",
          location: "Tokyo, Japan",
          period: "2013"
        },
        {
          employer: "Hakuhodo I-Studio",
          title: "Web Designer",
          location: "Tokyo, Japan",
          period: "2009 - 2013"
        },
        {
          employer: "Hatena",
          title: "Web Director & Designer",
          location: "Kyoto, Japan",
          period: "2008"
        },
        {
          employer: "Kyoto University of Art and Design",
          title: "BA in Information Design",
          location: "Kyoto, Japan",
          period: "2005 - 2009"
        }
      ];
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
    margin-top: 120px;
    & dl {
      margin-top: 40px;
      & dt {
        color: var(--nibihai);
        margin-bottom: 20px;
      }
      & dd {
      }
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
