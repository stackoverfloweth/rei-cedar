
import CdrIcon from 'componentsdir/icon/CdrIcon';

export default {
  name: 'IconPauseStroke',
  components: {
    CdrIcon,
  },
  extends: CdrIcon,
  render() {
    return (<cdr-icon {...this.$props}>
      {this.$slots.default}
      <path d="M12 22C6.4771525 22 2 17.5228475 2 12S6.4771525 2 12 2s10 4.4771525 10 10-4.4771525 10-10 10zm0-2c4.418278 0 8-3.581722 8-8s-3.581722-8-8-8-8 3.581722-8 8 3.581722 8 8 8zM9 8.02660409h1.5c.2761424 0 .5.22385763.5.5v6.94679181c0 .2761424-.2238576.5-.5.5H9c-.27614237 0-.5-.2238576-.5-.5V8.52660409c0-.27614237.22385763-.5.5-.5zm4.5 0H15c.2761424 0 .5.22385763.5.5v6.94679181c0 .2761424-.2238576.5-.5.5h-1.5c-.2761424 0-.5-.2238576-.5-.5V8.52660409c0-.27614237.2238576-.5.5-.5z"></path>
    </cdr-icon>)
  },
};
