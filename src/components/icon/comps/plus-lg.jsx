
import { CdrIcon } from '../CdrIcon';

export default {
  name: 'IconPlusLg',
  components: {
    CdrIcon,
  },
  extends: CdrIcon,
  render() {
    return (<cdr-icon {...this.$props}>
      {this.$slots.default}
      <path d="M11 11H6c-.55228475 0-1 .4477153-1 1s.44771525 1 1 1h5v5c0 .5522847.4477153 1 1 1s1-.4477153 1-1v-5h5c.5522847 0 1-.4477153 1-1s-.4477153-1-1-1h-5V6c0-.55228475-.4477153-1-1-1s-1 .44771525-1 1v5z"></path>
    </cdr-icon>)
  },
};
