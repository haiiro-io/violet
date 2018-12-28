<template>
  <svg
    :width="totalWidth"
    :height="totalHeight"
    :viewBox="viewBox"
    class="haiiroIcon"
    @mouseenter="hover"
    @mouseleave="unhover"
    @click="$emit('click')">
    <rect
      v-for="rect in rectangles"
      :key="rect.id"
      :id="rect.id"
      :x="rect.x"
      :y="rect.y"
      :width="rect.width"
      :height="rect.height"
      :fill="rect.color" />
  </svg>
</template>

<script lang="ts">
  import { Component, Vue } from "nuxt-property-decorator";

  import { namespace } from "vuex-class";
  import { name as PixelsNamespace } from "~/store/modules/pixels";
  const PixelsStore = namespace(PixelsNamespace);

  @Component({
    props: {
      size: {
        type: Number,
        default: 30
      }
    }
  })
  export default class HaiiroIcon extends Vue {
    @PixelsStore.State currentColors;
    @PixelsStore.Action hover;
    @PixelsStore.Action unhover;
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

    get rectangles () {
      const base =  { width: this.size, height: this.size };
      const rightColX = this.size * 2.1;
      const bottomRowY = this.size * 2;
      return [
        { ...base, id: "h-0-0", x: "0",       y: "0",         color: this.currentColors[0] },
        { ...base, id: "h-0-1", x: "0",       y: this.size,   color: this.currentColors[1] },
        { ...base, id: "h-0-2", x: "0",       y: bottomRowY,  color: this.currentColors[2] },
        { ...base, id: "h-1-1", x: this.size, y: this.size,   color: this.currentColors[3] },
        { ...base, id: "h-2-0", x: rightColX, y: "0",         color: this.currentColors[4] },
        { ...base, id: "h-2-1", x: rightColX, y: this.size,   color: this.currentColors[5] },
        { ...base, id: "h-2-2", x: rightColX, y: bottomRowY,  color: this.currentColors[6] }
      ];
    }
  }
</script>

<style lang="postcss" scoped>
  svg.haiiroIcon {
    display: inline-block;
    transition: ease 0.5s;
  }
  rect {
    transition: fill 0.75s ease;
  }
</style>

