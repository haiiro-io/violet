import Vue from "vue";
declare module "vue/types/vue" {
  interface Vue {
    $route: any;
  }
}
