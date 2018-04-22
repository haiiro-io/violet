<template>
  <section class="contact outerMoat">
    <h1>
      Contact Me
      <span class="workSelected-year">Say hello. Reaching out to me ☺</span>
    </h1>
    <form
      netlify
      name="contact"
      netlify-honeypot="bot-field"
      ref="contactForm">
      <input
        type="hidden"
        name="form-name"
        value="contact">
      <label for="sender">Name:</label>
      <input
        id="sender"
        type="text"
        name="sender">
      <label for="email">Email:</label>
      <input
        id="email"
        type="email"
        name="email">
      <label for="message">Message:</label>
      <textarea
        id="message"
        ref="messageTextArea"
        name="message" />
      <haiiro-button @click.native="sendForm">
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
    $refs: {
      contactForm: HTMLFormElement;
      messageTextArea: HTMLTextAreaElement;
    }
    @PixelsAction updateDefaultColors;

    mounted () {
      this.updateDefaultColors(
        ["#A7A7A7", "#CFCFCF","#D4D4D4", "#D4D4D4","#CFCFCF","#A7A7A7","#D4D4D4"]
      );
      const recaptchaBlock = document.querySelector(".g-recaptcha");
      if (recaptchaBlock) {
        this.$refs.messageTextArea.insertAdjacentElement("afterend", recaptchaBlock);
      }
    }

    beforeDestroy () {
      const recaptcha = document.querySelector(".g-recaptcha");
      const textArea = document.getElementById("hiddenTextArea");
      if (recaptcha && textArea) {
        textArea.insertAdjacentElement("afterend", recaptcha);
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
        console.log("state", xhr.readyState); // eslint-disable-line
        console.log("status", xhr.status); // eslint-disable-line
        if(xhr.readyState == xhr.HEADERS_RECEIVED) {
          console.log(xhr.getAllResponseHeaders()); // eslint-disable-line
        }
        if (xhr.readyState == xhr.DONE) {
          console.log(xhr.responseURL); // eslint-disable-line
        }
      };

      xhr.send(formData);
    }
  }
</script>

<style lang="postcss" scoped>
  @import "~/assets/styles/custom-properties.postcss";

  section.contact {
    max-width: 793px;
    margin: 0 auto;
    width: 66.7%;
    @media (--narrow) {
      width: 100%;
      padding-right: 20px;
      padding-left: 20px;
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
  }
  input {
    height: 60px;
  }
  input:focus, textarea:focus, textarea:focus {
    transition: all ease 0.4s;
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

</style>
