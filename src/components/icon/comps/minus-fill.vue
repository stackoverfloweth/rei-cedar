
    <script>
      import { defineComponent } from 'vue';
      import CdrIcon from '../CdrIcon.vue';

      export default defineComponent({
        name: 'MinusFill',
        components: { CdrIcon },
        props: {
          props: {
            type: Object,
          }
        },
      });
    </script>
    <template>
    <cdr-icon v-bind="props">
      <slot/>
      <path role="presentation" d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm4 9H8a1 1 0 000 2h8a1 1 0 000-2z"></path>
    </cdr-icon>
    </template>
  