import clsx from 'clsx';
import style from './styles/CdrText.scss';
import modifier from '../../mixins/modifier';

/**
 * Cedar 2 component for text styles
 * Accepts typography modifiers.
 * @version 0.0.1
 * @author [REI Software Engineering](https://rei.github.io/rei-cedar/)
 */
export default {
  name: 'CdrText',
  mixins: [modifier],
  props: {
    /** Any valid HTML tag */
    tag: {
      type: String,
      default: 'p',
    },
  },
  computed: {
    baseClass() {
      return 'cdr-text';
    },
  },
  data() {
    return {
      style,
    }
  },
  render() {
    const Component = this.tag;
    return (<Component class={clsx(this.style[this.baseClass], this.modifierClass)}>
      {this.$slots.default}
    </Component>);
  },
};
