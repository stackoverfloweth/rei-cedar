<script>
import { defineComponent, useCssModule } from 'vue';

export default defineComponent({
  name: 'CdrCaption',
  props: {
    summary: {
      type: String,
    },
    credit: {
      type: String,
    },
  },

  setup() {
    return {
      style: useCssModule(),
      baseClass: 'cdr-caption',
      summaryClass: 'cdr-caption__summary',
      citeClass: 'cdr-caption__cite',
    };
  },
});
</script>

<template>
  <div :class="style[baseClass]">
    <p
      v-if="summary"
      :class="style[summaryClass]"
    >
      {{ summary }}
    </p>
    <cite
      v-if="credit"
      :class="style[citeClass]"
    >
      {{ credit }}
    </cite>
  </div>
</template>

<style lang="scss" module src="./styles/CdrCaption.module.scss">
</style>
