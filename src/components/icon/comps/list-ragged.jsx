
import { CdrIcon } from '../CdrIcon';

export default {
  name: 'IconListRagged',
  components: {
    CdrIcon,
  },
  extends: CdrIcon,
  render() {
    return (<cdr-icon {...this.$props}>
      {this.$slots.default}
      <path d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h10a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h14a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"></path>
    </cdr-icon>)
  },
};
