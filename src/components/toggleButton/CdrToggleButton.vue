<script>
import {
  useCssModule, computed, defineComponent, inject,
} from 'vue';

export default defineComponent({
  name: 'CdrToggleButton',
  props: {
    toggleValue: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const selectedToggle = inject('selectedToggleValue');
    const isActive = computed(() => props.toggleValue === selectedToggle.value);
    return {
      style: useCssModule(),
      isActive,
    };
  },
});
</script>

<template>
  <li
    role="presentation"
    :class="style['cdr-toggle-button__container']"
  >
    <button
      role="radio"
      :class="style['cdr-toggle-button__item']"
      :value="toggleValue"
      :aria-label="toggleValue"
      :aria-checked="isActive ? 'true' : 'false'"
      :tabindex="isActive ? 0 : -1"
    >
      <slot>{{ toggleValue }}</slot>

    </button>
  </li>
</template>

<style lang="scss" module src="./styles/CdrToggleButton.module.scss">
</style>
