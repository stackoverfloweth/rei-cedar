<template>
  <div
    :aria-hidden="!active"
    :aria-labelledby="ariaLabelledby"
    :class="mapClasses(style, baseClass, modifierClass, animationDirection && `cdr-tab-panel-${animationDirection}`)"
    :hidden="hidden"
    :id="id"
    tabindex="0"
    role="tabpanel"
    @keydown.up.prevent="handleUpArrowNav"
    @animationend="animationEnd"
    :key="name"
  >
    <slot />
  </div>
</template>
<script setup>
import { useCssModule, computed, ref, inject, onBeforeMount } from 'vue';

// TODO: PUT MODIFIER HERE!
import { buildClass } from '../../utils/buildClass';
import propValidator from '../../utils/propValidator';
import mapClasses from '../../utils/mapClasses';

const props = defineProps({
    /**
     * Required string value that shows up on tab header
     */
    name: {
      type: String,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    ariaLabelledby: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    modifier: {
      type: String,
      default: '',
      validator: (value) => propValidator(value, ['centered', 'compact', 'full-width', 'no-border', '']),
    },
  })

  const baseClass = 'cdr-tab-panel';
  const style = useCssModule();

  const active = ref(false);
  const hidden = ref(true);
  const animationDirection = ref(null);

  const modifierClass = computed(() => buildClass(baseClass, props.modifier));
  const emit = defineEmits(['tab-change', 'tab-arrow-up'])

  const setActive = (state) => {
    // TODO: provide/inject current active tab index or something?
    if (state) hidden.value = false;
    active.value = state;
    emit('tab-change', state, props.id);
  };
  const setAnimationDirection = (direction) => {
    // TODO Use provide/inject here?
    // console.log(direction, 'YOOOOOO')
    animationDirection.value = direction;
  };
  const handleUpArrowNav = () => {
    // YOU WAHT NOW?!?!?!
    // TODO: emit event for tabPanel to deal with????
    emit('tab-arrow-up')
    // $parent.setFocusToActiveTabHeader();
  };
  const animationEnd = (event) => {
    if (event.animationName.split('-')[0] === 'exit') {
      hidden.value = true;
      animationDirection.value = null;
    }
  };

  const tabs = inject('tabs');

  onBeforeMount(() => {
    tabs.value.push({
      name: props.name,
      id: props.id,
      disabled: props.disabled,
      ariaLabelledby: props.ariaLabelledby,
      setActive,
      setAnimationDirection,
    })
  })
</script>

<style lang="scss" module src="./styles/CdrTabPanel.module.scss">
</style>
