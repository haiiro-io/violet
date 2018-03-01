<template>
  <svg
    class="haiiroIcon"
    :width="totalWidth"
    :height="totalHeight"
    :viewBox="viewBox">
    <rect id="h-0-0" x="0"            y="0"         :width="size" :height="size" :fill="colors[0]" />
    <rect id="h-0-1" x="0"            :y="size"     :width="size" :height="size" :fill="colors[1]" />
    <rect id="h-0-2" x="0"            :y="size * 2" :width="size" :height="size" :fill="colors[2]" />
    <rect id="h-1-1" :x="size"        :y="size"     :width="size" :height="size" :fill="colors[3]" />
    <rect id="h-2-0" :x="size * 2.1"  y="0"         :width="size" :height="size" :fill="colors[4]" />
    <rect id="h-2-1" :x="size * 2.1"  :y="size"     :width="size" :height="size" :fill="colors[5]" />
    <rect id="h-2-2" :x="size * 2.1"  :y="size * 2" :width="size" :height="size" :fill="colors[6]" />
  </svg>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "nuxt-class-component";

  @Component({
    props: {
      size: {
        type: Number,
        default: 30
      },
      colors: {
        type: Array,
        default: () => ["#555", "#555", "#555", "#555", "#555", "#555", "#555"]
      }
    }
  })
  export default class HaiiroIcon extends Vue {
    size: number;
    width: number;
    height: number;

    get viewBox (): string {
      return `0 0 ${this.totalWidth} ${this.totalHeight}`;
    }

    get totalWidth (): number {
      return this.size * 3 + this.size / 10;
    }

    get totalHeight (): number {
      return this.size * 3;
    }
  }
</script>

<style lang="postcss">
  svg.haiiroIcon {
    display: inline-block;
  }
</style>

