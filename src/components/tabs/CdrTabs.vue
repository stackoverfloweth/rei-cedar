<script>
import {
  defineComponent, ref, provide, onMounted, nextTick, computed, useCssModule,
} from 'vue';
import debounce from 'lodash-es/debounce';
import {
  CdrColorBackgroundPrimary, CdrSpaceOneX, CdrSpaceHalfX,
} from '@rei/cdr-tokens/dist/js/cdr-tokens.mjs';
import mapClasses from '../../utils/mapClasses';
import { modifyClassName } from '../../utils/buildClass';

export default defineComponent({
  name: 'CdrTabs',
  props: {
    height: {
      type: String,
      default: '240px',
    },
    activeTab: {
      type: Number,
      default: 0,
    },
    modifier: String,
    size: String,
    backgroundColor: {
      type: String,
      default: CdrColorBackgroundPrimary,
    },
  },
  setup(props, ctx) {
    const slottedTabs = ctx.slots.default()[0].children?.length
      ? ctx.slots.default()[0].children
      : ctx.slots.default();
    const baseClass = 'cdr-tabs';

    // Refs
    const tabs = ref(slottedTabs.map((tab) => ({
      name: tab.props.name,
      disabled: tab.props.disabled,
      id: tab.props['aria-labelledby'],
    })));
    const selectedTabName = ref(null);
    const selectedIndex = ref(null);
    const headerOverflow = ref(false);
    const headerWidth = ref(0);
    const tabElements = ref([]);
    const tablist = ref(null);
    const containerEl = ref(null);
    const overflowLeft = ref(false);
    const overflowRight = ref(false);
    const underlineOffsetX = ref(0);
    const underlineWidth = ref(0);

    provide('selectedTabName', selectedTabName);

    // Computed
    const modifierClass = computed(() => props.modifier
      && modifyClassName('cdr-tabs', props.modifier));
    const sizeClass = computed(() => props.size && modifyClassName('cdr-tabs', props.size));
    const underlineStyle = computed(() => ({
      transform: `translateX(${underlineOffsetX.value}px)`,
      width: `${underlineWidth.value}px`,
    }));
    const gradientLeftStyle = computed(() => {
      const gradient = `linear-gradient(to left, rgba(255, 255, 255, 0), ${props.backgroundColor})`;
      return {
        background: gradient,
      };
    });
    const gradientRightStyle = computed(() => {
      const gradient = `linear-gradient(to right, rgba(255, 255, 255, 0),
        ${props.backgroundColor})`;
      return {
        background: gradient,
      };
    });
    const checkIfActive = (index, tab) => (selectedIndex.value === index && !tab.disabled);
    const calculateOverflow = () => {
      let containerWidth = 0;
      if (containerEl.value) {
        containerWidth = containerEl.value.offsetWidth;
      }
      headerOverflow.value = headerWidth.value > containerWidth;
      if (headerOverflow.value) {
        // Get Scroll Position
        const scrollX = tablist.value.scrollLeft;
        overflowLeft.value = scrollX > 1;
        overflowRight.value = (scrollX + 1) < (headerWidth.value - containerWidth);
      } else {
        overflowLeft.value = false;
        overflowRight.value = false;
      }
    };

    const getHeaderWidth = () => {
      let headerElements = [];
      if (tablist.value) {
        headerElements = Array.from(tablist.value.children);
      }
      let totalWidth = 0;
      headerElements.forEach((element, i) => {
        // account for margin-left on header elements
        if (i > 0) {
          totalWidth += props.size === 'small' ? Number(CdrSpaceHalfX) : Number(CdrSpaceOneX);
        }
        totalWidth += element.offsetWidth || 0;
      });
      return totalWidth;
    };

    const updateUnderline = () => {
      if (tabElements.value.length > 0) {
        const activeTab = tabElements.value[selectedIndex.value];
        const activeRect = activeTab.getBoundingClientRect();
        const parentRect = tablist.value.getBoundingClientRect();
        const offset = activeRect.x - parentRect.x;

        underlineOffsetX.value = offset
          - tablist.value.scrollLeft;
        underlineWidth.value = activeRect.width;

        // shrink/hide the underline if it scrolls outside the container
        if (underlineOffsetX.value + underlineWidth.value >= parentRect.width) {
          underlineWidth.value = Math.max(0, parentRect.width - underlineOffsetX.value);
          underlineOffsetX.value = Math.min(underlineOffsetX.value, parentRect.width);
        } else if (underlineOffsetX.value < 0) {
          underlineWidth.value = Math.max(0, underlineWidth.value + underlineOffsetX.value);
          underlineOffsetX.value = 0;
        }
      }
    };
    const selectTab = async (index) => {
      const tabToSelect = tabElements.value[index];
      selectedTabName.value = tabs.value[index].name;
      selectedIndex.value = index;
      await nextTick();
      tabToSelect.focus();
      updateUnderline();
    };

    const selectTabNext = () => {
      const isLastTab = (selectedIndex.value === tabElements.value.length - 1);
      if (isLastTab) {
        return;
      }

      let nextIndex = selectedIndex.value + 1;
      if (tabElements.value[nextIndex].disabled) {
        nextIndex += 1;
      }

      const nextIndexExists = (nextIndex <= tabElements.value.length - 1);
      if (!nextIndexExists) {
        return;
      }

      selectTab(nextIndex);
    };

    const selectTabPrev = () => {
      const isFirstTab = (selectedIndex.value <= 0);
      if (isFirstTab) {
        return;
      }

      let prevIndex = selectedIndex.value - 1;
      if (tabElements.value[prevIndex].disabled) {
        prevIndex -= 1;
      }

      const previousIndexExists = (prevIndex >= 0);
      if (!previousIndexExists) {
        return;
      }
      selectTab(prevIndex);
    };

    const setInitialTabStates = () => {
      tabElements.value.forEach((tab, index) => {
        if (!tab.disabled && selectedIndex.value === null) {
          selectedIndex.value = index;
          selectedTabName.value = tabs.value[index].name;
        }
      });
    };

    onMounted(() => {
      setInitialTabStates();
      headerWidth.value = getHeaderWidth();
      calculateOverflow();
      setTimeout(() => {
        updateUnderline();
      }, 250);
      window.addEventListener('resize', debounce(() => {
        headerWidth.value = getHeaderWidth();
        calculateOverflow();
        updateUnderline();
      }, 250));
      tablist.value.addEventListener('scroll', debounce(() => {
        calculateOverflow();
        updateUnderline();
      }, 50));
    });

    const style = useCssModule();
    return {
      slottedTabs,
      baseClass,
      tabs,
      selectedTabName,
      selectedIndex,
      headerOverflow,
      headerWidth,
      tabElements,
      tablist,
      containerEl,
      overflowLeft,
      overflowRight,
      underlineOffsetX,
      underlineWidth,
      mapClasses,
      modifierClass,
      sizeClass,
      underlineStyle,
      gradientLeftStyle,
      gradientRightStyle,
      checkIfActive,
      calculateOverflow,
      getHeaderWidth,
      updateUnderline,
      selectTabNext,
      selectTabPrev,
      selectTab,
      setInitialTabStates,
      style,
    };
  },
});
</script>

<template>
  <div
    :class="mapClasses(style, baseClass, modifierClass, sizeClass)"
    ref="containerEl"
    :style="{ height }"
  >
    <div
      :class="style['cdr-tabs__gradient-container']"
    >
      <div
        :class="mapClasses(
          style,
          'cdr-tabs__gradient',
          'cdr-tabs__gradient--left',
          overflowLeft ? 'cdr-tabs__gradient--active' : ''
        )"
        :style="gradientLeftStyle"
      />
      <ul
        :class="style['cdr-tabs__header-container']"
        role="tablist"
        ref="tablist"
      >
        <li
          v-for="(tab, index) in tabs"
          :key="`${tab.name}-${index}`"
          role="presentation"
          :class="style['cdr-tabs__header']"
        >
          <button
            :ref="el => { tabElements[index] = el }"
            :id="tab.id"
            :disabled="tab.disabled"
            :aria-selected="checkIfActive(index, tab)"
            :tabIndex="checkIfActive(index, tab) ? 0 : -1"
            :class="mapClasses(
              style,
              checkIfActive(index, tab) ? 'cdr-tabs__header-item-active' : '',
              'cdr-tabs__header-item',
              tab.disabled ? 'cdr-tabs__header-item--disabled' : '',
            )"
            role="tab"
            @click.prevent="selectTab(index)"
            @keyup.right="selectTabNext"
            @keyup.left="selectTabPrev"
          >{{ tab.name }}</button>
        </li>
      </ul>
      <div
        :class="mapClasses(
          style,
          'cdr-tabs__gradient',
          'cdr-tabs__gradient--right',
          overflowRight ? 'cdr-tabs__gradient--active' : '',
        )"
        :style="gradientRightStyle"
      />
      <div
        :class="style['cdr-tabs__underline']"
        :style="underlineStyle"
      />
    </div>
    <slot />
  </div>
</template>

<style lang="scss" module src="./styles/CdrTabs.module.scss">
</style>
