
import CdrIcon from '../CdrIcon';

export default {
  name: 'IconWarningStroke',
  components: {
    CdrIcon,
  },
  extends: CdrIcon,
  render() {
    return (<cdr-icon {...{props: this.$props} }>
      {this.$slots.default}
      <path d="M12 22C6.4771525 22 2 17.5228475 2 12S6.4771525 2 12 2s10 4.4771525 10 10-4.4771525 10-10 10zm0-2c4.418278 0 8-3.581722 8-8s-3.581722-8-8-8-8 3.581722-8 8 3.581722 8 8 8zm-.2201558-14h.4403116c.5522848 0 1 .44771525 1 1a1.00016664 1.00016664 0 0 1-.0004322.02939905l-.1911765 6.50000005C13.012647 14.070002 12.569816 14.5 12.0289793 14.5h-.0579586c-.5408367 0-.9836677-.429998-.9995678-.9706009l-.1911765-6.50000005c-.0162366-.55204603.4181227-1.01273016.9701687-1.0289668A.99999864.99999864 0 0 1 11.7798442 6zM12 18c-.6903559 0-1.25-.5596441-1.25-1.25s.5596441-1.25 1.25-1.25 1.25.5596441 1.25 1.25S12.6903559 18 12 18z"></path>
    </cdr-icon>)
  },
};