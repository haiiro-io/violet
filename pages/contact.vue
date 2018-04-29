<template>
  <section class="pageContact outerMoat">
    <h1>
      {{ $t("contact.title") }}
      <span class="pageContact-subtitle">{{ $t("contact.subtitle") }} &#128075;</span>
    </h1>
    <transition name="fade">
      <form
        netlify
        v-if="editable"
        name="contact"
        class="pageContact-form"
        netlify-honeypot="bot-field"
        ref="contactForm">
        <input
          type="hidden"
          name="form-name"
          value="contact">
        <label for="sender">{{ $t("contact.sender") }}</label>
        <input
          id="sender"
          type="text"
          ref="sender"
          v-model="message.sender"
          name="sender">
        <label for="email">{{ $t("contact.email") }}</label>
        <input
          id="email"
          type="email"
          ref="email"
          v-model="message.email"
          name="email">
        <label for="message">{{ $t("contact.message") }}</label>
        <textarea
          id="message"
          ref="textarea"
          v-model="message.textarea"
          name="message" />
        <haiiro-button @click.native="validateAndSend">
          {{ sending ? $t("contact.sending") : $t("contact.send") }}
        </haiiro-button>
      </form>
      <div
        v-else
        class="pageContact-sent">
        <h2>{{ $t("contact.happened") }}</h2>
        <p>{{ $t("contact.happened_message") }}</p>
      </div>
    </transition>
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

  enum SendingState {
    NO_YET,
    HAPPENING,
    HAPPENED
  }

  @Component({
    components: { HaiiroButton }
  })
  export default class PageContact extends PageBase {
    sendingState: SendingState = SendingState.NO_YET;
    message = {
      sender: "",
      email: "",
      textarea: ""
    };

    $refs: {
      contactForm: HTMLFormElement;
      sender: HTMLInputElement;
      email: HTMLInputElement;
      textarea: HTMLTextAreaElement;
    };

    @PixelsAction updateDefaultColors;

    get editable (): boolean {
      return this.sendingState !== SendingState.HAPPENED;
    }

    get sending (): boolean {
      return this.sendingState === SendingState.HAPPENING;
    }

    mounted () {
      this.updateDefaultColors(
        ["#A7A7A7", "#CFCFCF","#D4D4D4", "#D4D4D4","#CFCFCF","#A7A7A7","#D4D4D4"]
      );
      const recaptchaBlock = document.querySelector(".g-recaptcha");
      if (recaptchaBlock) {
        this.$refs.textarea.insertAdjacentElement("afterend", recaptchaBlock);
      }
    }

    beforeDestroy () {
      const recaptcha = document.querySelector(".g-recaptcha");
      const textarea = document.getElementById("hiddenTextArea");
      if (recaptcha && textarea) {
        textarea.insertAdjacentElement("afterend", recaptcha);
      }
    }

    validateAndSend () {
      if (this.sendingState !== SendingState.NO_YET) {
        return;
      }
      this.sendingState = SendingState.HAPPENING;
      const invalid = Object.keys(this.message).map((field) => {
        if ((this.message[field] as string).trim().length === 0) {
          (this.$refs[field] as HTMLElement).classList.add("error");
          return false;
        } else {
          (this.$refs[field] as HTMLElement).classList.remove("error");
          return true;
        }
      }).some(result => !result);
      if (!invalid) {
        this.sendForm();
      } else {
        this.sendingState = SendingState.NO_YET;
      }
    }

    sendForm () {
      const xhr = new XMLHttpRequest();
      const formData = Array.from(
        this.$refs.contactForm.querySelectorAll("input, textarea")
      ).map((field: HTMLTextAreaElement | HTMLInputElement) => {
        return `${field.name}=${field.value}`;
      }).join("&").replace(/%20/g, "+");
        

      xhr.addEventListener("error", (event) => {
        console.error("Failed form sending", event); // eslint-disable-line
      });

      xhr.open("POST", "/thanks");
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

      xhr.onreadystatechange = () => {
        if (xhr.readyState === xhr.DONE) {
          if (xhr.status === 200 && xhr.responseURL.endsWith("/thanks")) {
            this.sendingState = SendingState.HAPPENED;
          } else {
            this.sendingState = SendingState.NO_YET;
          }
        }
      };

      xhr.send(formData);
    }
  }
</script>

<style lang="postcss" scoped>
  @import "~/assets/styles/custom-properties.postcss";

  section.pageContact {
    max-width: 793px;
    margin: 0 auto;
    width: 66.7%;
    transition: height .4s;
    @media (--narrow) {
      width: 100%;
      padding-right: 20px;
      padding-left: 20px;
      padding-top: 170px;
    }
  }

  h1 {
    text-align: center;
    font-size: 36px;
    line-height: 1.7;
    font-weight: bold;
    margin: 120px auto 80px;
    color: var(--konezumi);
    @media (--narrow) {
      font-size: 30px;
    }
    & > .pageContact-subtitle {
      font-size: 18px;
      font-weight: normal;
      display: block;
      margin-top: 20px;
      text-align: center;
      color: var(--nibihai);
    }
  }

  form {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
  label {
    width: 100%;
    font-size: 16px;
    margin-bottom: 10px;
  }
  input + label {
    margin-top: 40px;
  }
  input, textarea {
    color: var(--konezumi);
    padding: 20px;
    width: 100%;
    border: none;
    outline: none;
    background-color: #f9f9f9;
    transition: all ease 0.4s;
    &.error {
      background-color: pink;
    }
  }
  input {
    height: 60px;
  }
  input:focus, textarea:focus, textarea:focus {
    box-shadow: 0 2px 0 0 var(--nibihai);
  }
  input:hover, textarea:hover, textarea:hover {
    background-color: #f1f1f1;
  }
  textarea {
    height: 170px;
  }

  >>> .g-recaptcha {
    margin-top: 35px;
  }

  .haiiroButton {
    margin-top: 35px;
    width: 304px;
    text-align: center;
  }

  .pageContact-sent {
    text-align: center;
    & h2 {
      margin-bottom: 40px;
    }
  }

.fade-enter-active, .fade-leave-active {
  transition-property: opacity;
  transition-duration: .25s;
}

.fade-enter-active {
  transition-delay: .50s;
}

.fade-enter, .fade-leave-active {
  opacity: 0
}
</style>
