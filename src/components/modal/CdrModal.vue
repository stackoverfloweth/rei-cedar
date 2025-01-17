<script>
import debounce from 'lodash-es/debounce';
import tabbable from 'tabbable';
import {
  useCssModule, computed, ref, watch, onMounted, nextTick, onUnmounted, defineComponent,
} from 'vue';
import {
  CdrBreakpointSm, CdrSpaceOneX, CdrSpaceTwoX,
} from '@rei/cdr-tokens/dist/js/cdr-tokens.mjs';
import onTransitionEnd from './onTransitionEnd';
import CdrButton from '../button/CdrButton.vue';
import IconXLg from '../icon/comps/x-lg.vue';
import mapClasses from '../../utils/mapClasses';

export default defineComponent({
  name: 'CdrModal',
  components: { CdrButton, IconXLg },
  props: {
    opened: {
      type: Boolean,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    showTitle: {
      type: Boolean,
      required: false,
      default: true,
    },
    ariaDescribedby: {
      type: String,
      required: false,
      default: null,
    },
    role: {
      type: String,
      required: false,
      default: 'dialog',
    },
    id: {
      type: String,
      required: false,
      default: null,
    },
    overlayClass: String,
    wrapperClass: String,
    contentClass: String,
    animationDuration: {
      type: Number,
      default: 300,
    },
  },
  emits: ['closed'],

  setup(props, ctx) {
    const baseClass = 'cdr-modal';
    let unsubscribe;
    let lastActive;
    const modalClosed = ref(!props.opened);
    const isOpening = ref(false);

    const offset = ref(null);
    const headerHeight = ref(0);
    const totalHeight = ref(0);
    const scrollHeight = ref(0);
    const offsetHeight = ref(0);
    const offsetWidth = ref(0);
    const clientWidth = ref(0);
    const fullscreen = ref(false);

    const modalEl = ref(null);
    const wrapperEl = ref(null);
    const contentEl = ref(null);
    const headerEl = ref(null);

    const measureContent = () => {
      nextTick(() => {
        totalHeight.value = window.innerHeight;
        fullscreen.value = window.innerWidth < CdrBreakpointSm;
        headerHeight.value = headerEl.value?.offsetHeight;
        scrollHeight.value = contentEl.value?.scrollHeight;
        offsetHeight.value = contentEl.value?.offsetHeight;
        offsetWidth.value = contentEl.value?.offsetWidth;
        clientWidth.value = contentEl.value?.clientWidth;
      });
    };

    const onClick = (e) => {
      ctx.emit('closed', e);
    };

    const handleKeyDown = ({ key }) => {
      switch (key) {
        case 'Escape':
        case 'Esc':
          onClick();
          break;
        default: break;
      }
    };
    const handleFocus = (e) => {
      const { documentElement } = document;
      if (modalEl.value.contains(e.target) || !documentElement) return;

      const tabbables = tabbable(documentElement);
      const these = tabbable(modalEl.value);
      const nextIx = tabbables.indexOf(e.target);
      const firstModalIx = tabbables.indexOf(these[0]);
      const nextRef = nextIx < firstModalIx ? these[these.length - 1] : these[0];
      if (nextRef) nextRef.focus();
    };

    const handleResize = debounce(() => {
      measureContent();
    }, 300);

    const addNoScroll = () => {
      const { documentElement, body } = document;
      offset.value = {
        x: window.scrollX
      || (documentElement || {}).scrollLeft
      || (body || {}).scrollLeft
      || 0,
        y: window.scrollY
      || (documentElement || {}).scrollTop
      || (body || {}).scrollTop
      || 0,
      };

      if (documentElement) {
        documentElement.classList.add('cdr-modal__noscroll');
        // keep current scroll position manually
        documentElement.style.top = `-${offset.value.y}px`;
        documentElement.style.left = `-${offset.value.x}px`;
      }

      if (body) {
        body.classList.add('cdr-modal__noscroll');
      }
    };

    const removeNoScroll = () => {
      const { documentElement, body } = document;

      if (body) {
        body.classList.remove('cdr-modal__noscroll');
      }

      if (documentElement) {
        documentElement.classList.remove('cdr-modal__noscroll');
        documentElement.style.top = '';
        documentElement.style.left = '';
      }
    };

    const addHandlers = () => {
      document.addEventListener('focusin', handleFocus, true);
      document.addEventListener('keydown', handleKeyDown);
    };

    const handleOpened = () => {
      const { activeElement } = document;
      addNoScroll();
      isOpening.value = true;
      modalClosed.value = false;
      lastActive = activeElement;

      nextTick(() => {
        if (modalEl.value) modalEl.value.focus(); // wrapped in if so testing error isn't thrown
        measureContent();
        addHandlers();

        setTimeout(() => {
          // for some reason Safari scrolls the wrapper down a bit?
          // doesn't work without setTimeout for some unknown reason
          if (wrapperEl.value) wrapperEl.value.scrollTop = 0;

          // there is a race condition for measuring overflow when modal defaults to open,
          // this seems to cover that
          measureContent();
        });
      });
    };

    const handleClosed = () => {
      const { documentElement } = document;
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('focusin', handleFocus, true);
      isOpening.value = false;

      unsubscribe = onTransitionEnd(
        wrapperEl.value,
        () => {
          if (isOpening.value) return;
          unsubscribe();
          removeNoScroll();
          unsubscribe = null;
          modalClosed.value = true;

          // handle scroll-behavior: smooth
          if (documentElement) documentElement.style.scrollBehavior = 'auto';
          // restore previous scroll position
          window.scrollTo(offset.value.x, offset.value.y);
          if (documentElement) documentElement.style.scrollBehavior = '';

          if (lastActive) lastActive.focus();
        },
        props.animationDuration + 16,
      );
    };

    const dialogAttrs = computed(() => ({
      ...ctx.attrs,
      'aria-describedby': props.ariaDescribedby,
      'aria-modal': 'true',
      id: props.id,
    }));
    const verticalSpace = computed(() => {
      // contentWrap vertical padding
      const fullscreenSpace = Number(CdrSpaceTwoX);
      const windowedSpace = Number(CdrSpaceTwoX) + Number(CdrSpaceOneX);

      return fullscreen.value
        ? fullscreenSpace
        : windowedSpace + fullscreenSpace;
      // fullscreen, here, would account for outerWrap padding, which is the same CdrSpaceTwoX
    });
    const scrollMaxHeight = computed(() => totalHeight.value
    - headerHeight.value
    - verticalSpace.value);

    const scrollPadding = computed(() => {
      const isScrolling = scrollHeight.value > offsetHeight.value;
      const hasScrollbar = offsetWidth.value - clientWidth.value > 0;
      if (isScrolling && hasScrollbar) {
        return 4;
      } if (isScrolling) {
        return 12;
      }
      return 0;
    });

    watch(() => props.opened, (newValue, oldValue) => {
      if (!!newValue === !!oldValue) return;
      // eslint-disable-next-line no-unused-expressions
      newValue ? handleOpened() : handleClosed();
    });

    onMounted(() => {
      if (props.opened) {
        handleOpened();
      }
      window.addEventListener('resize', handleResize);
    });

    onUnmounted(() => {
      window.removeEventListener('resize', handleResize);
    });
    return {
      style: useCssModule(),
      mapClasses,
      baseClass,
      modalClosed,
      modalEl,
      wrapperEl,
      contentEl,
      headerEl,
      scrollMaxHeight,
      scrollPadding,
      onClick,
      dialogAttrs,

    };
  },

});

</script>

<template>
  <div
    :class="mapClasses(style, baseClass, !opened && 'cdr-modal--closed')"
    ref="wrapperEl"
  >
    <div
      :class="[style['cdr-modal__outerWrap'], wrapperClass]"
    >
      <div
        aria-hidden="true"
        @click="onClick"
        :class="[style['cdr-modal__overlay'], overlayClass]"
      />
      <!-- This div (and the one below) is used to avoid a screen reader "keyboard" trap where the
           content outside the modal is not properly obscurred when opened using certain readers.
           Once more browsers catch up to the spec, this hack can probably be removed.
           https://a11ysupport.io/tests/apg__modal-dialog-example -->
      <div :tabIndex="opened ? '0' : undefined" />
      <div
        ref="modalEl"
        :class="mapClasses(style, 'cdr-modal__contentWrap', 'cdr-modal__dialog')"
        tabIndex="-1"
        :role="role"
        :aria-modal="!!opened"
        :aria-label="label"
        v-bind="dialogAttrs"
      >
        <slot name="modal">
          <div
            :class="[style['cdr-modal__innerWrap'], contentClass]"
            :style="modalClosed ? {display: 'none'} : undefined"
          >
            <section>
              <div :class="style['cdr-modal__content']">
                <div
                  :class="style['cdr-modal__header']"
                  ref="headerEl"
                >
                  <div :class="style['cdr-modal__title']">
                    <slot
                      name="title"
                      v-if="showTitle"
                    >
                      <h1>{{ label }}</h1>
                    </slot>
                  </div>
                  <cdr-button
                    :class="style['cdr-modal__close-button']"
                    icon-only
                    :with-background="true"
                    @click="onClick"
                    aria-label="Close"
                  >
                    <template #icon>
                      <icon-x-lg inherit-color />
                    </template>
                  </cdr-button>
                </div>

                <div
                  :class="style['cdr-modal__text-content']"
                  :style="{ maxHeight: `${scrollMaxHeight}px`, paddingRight: `${scrollPadding}px`}"
                  role="document"
                  ref="contentEl"
                  tabindex="0"
                >
                  <slot />
                </div>
              </div>
            </section>
          </div>

        </slot>
      </div>
      <div :tabIndex="opened ? '0' : undefined" />
    </div>
  </div>

</template>

<style lang="scss" module src="./styles/CdrModal.module.scss">
</style>
