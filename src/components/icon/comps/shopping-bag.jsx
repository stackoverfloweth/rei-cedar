
import CdrIcon from 'componentsdir/icon/CdrIcon';

export default {
  name: 'IconShoppingBag',
  components: {
    CdrIcon,
  },
  extends: CdrIcon,
  render() {
    return (<cdr-icon {...this.$props}>
      {this.$slots.default}
      <path d="M7 8c0-2.76142375 2.23857625-5 5-5 2.7614237 0 5 2.23857625 5 5h2.0742749c.5197018 0 .952781.39808775.9964616.9159506l.9278264 11c.0464192.5503305-.3620816 1.0340918-.9124122 1.080511A.99999784.99999784 0 0 1 20.0021013 21H4c-.55228475 0-1-.4477153-1-1a.99999836.99999836 0 0 1 .00343313-.0827917l.91384609-11C3.96034634 8.39880772 4.39365965 8 4.91384609 8H7zm-1.16578587 2l-.74769226 9H18.9142025l-.7591307-9H17v1c0 .5522847-.4477153 1-1 1-.5524172 0-1.0003666-.4475827-1.0008191-.9999997L14.9983619 10H9v1c0 .5522847-.44771525 1-1 1-.5519054 0-.99931312-.4474077-.99931312-.9993131l2.4e-7-.0006867L7.00137424 10H5.83421413zM12 5c-1.6568542 0-3 1.34314575-3 3h6c0-1.65685425-1.3431458-3-3-3z"></path>
    </cdr-icon>);
  },
};
