
import CdrIcon from 'componentsdir/icon/CdrIcon';

export default {
  name: 'IconSnow',
  components: {
    CdrIcon,
  },
  extends: CdrIcon,
  render() {
    return (<cdr-icon {...this.$props}>
      {this.$slots.default}
      <path d="M13.3096607 12.75h3.2796787l1.8567475 1.8567474c.2928932.2928933.7677669.2928933 1.0606602 0 .2928932-.2928932.2928932-.7677669 0-1.0606601L18.7106598 12.75H21.25c.4142136 0 .75-.3357864.75-.75s-.3357864-.75-.75-.75h-2.500168l.7592896-.7592897c.2928933-.2928932.2928933-.76776694 0-1.06066016-.2928932-.29289322-.7677669-.29289322-1.0606601 0L16.6285116 11.25h-3.2976058l1.6380589-2.83720128 2.4860977-.66614788c.4000996-.10720636.6375365-.51845908.5303301-.91855865-.1072064-.40009958-.5184591-.63753645-.9185587-.53033009l-1.037209.27791931 1.2608281-2.1838182c.2071068-.35871947.0842004-.81741227-.2745191-1.02451905-.3587194-.20710679-.8174122-.08420042-1.024519.27451905l-1.2798205 2.21671407-.2913882-1.08747544c-.1072063-.40009958-.518459-.63753645-.9185586-.53033009-.4000996.10720636-.6375365.51845908-.5303301.91855866l.6796167 2.53636418-1.629689 2.82270421-1.659304-2.87399887.6661479-2.48609774c.1072063-.40009958-.1302305-.8113523-.5303301-.91855866-.4000996-.10720635-.81135232.13023051-.91855868.53033009l-.27791931 1.037209-1.26082803-2.18381821c-.20710678-.35871946-.66579959-.48162583-1.02451906-.27451905-.35871946.20710678-.48162583.66579959-.27451905 1.02451905l1.27982047 2.21671408-1.08747544-.29138817c-.40009958-.10720636-.8113523.13023051-.91855866.53033009-.10720636.40009957.13023051.81135229.53033009.91855865l2.53636418.67961673L10.7115844 11.25h-3.318608L5.57302655 9.43005014c-.29289322-.29289322-.76776696-.29289322-1.06066018 0-.29289322.29289322-.29289322.76776696 0 1.06066016L5.27165606 11.25H2.75c-.41421356 0-.75.3357864-.75.75s.33578644.75.75.75h2.55964094l-.79608728.7960873c-.29289322.2928932-.29289322.7677669 0 1.0606601.29289322.2928933.76776695.2928933 1.06066017 0L7.43096128 12.75h3.30186822l-1.66108445 2.8770827-2.53636418.6796168c-.40009958.1072063-.63753645.5184591-.53033009.9185586.10720636.4000996.51845908.6375365.91855865.5303301L8.01108488 17.4642l-1.26967011 2.1991332c-.20710678.3587194-.08420041.8174122.27451905 1.024519.35871947.2071068.81741228.0842004 1.02451906-.274519l1.25008402-2.1652091.27791932 1.037209c.10720635.4000996.51845908.6375365.91855868.5303301.4000995-.1072063.6375364-.5184591.5303301-.9185586l-.6661479-2.4860978 1.670048-2.892608 1.6398394 2.8402851-.6796167 2.5363642c-.1072064.4000996.1302305.8113523.53033.9185587.4000996.1072063.8113523-.1302305.9185587-.5303301l.2913882-1.0874754 1.2696701 2.1991331c.2071068.3587195.6657996.4816258 1.024519.274519.3587195-.2071067.4816259-.6657995.2745191-1.024519l-1.250084-2.1652091 1.037209.2779194c.4000995.1072063.8113522-.1302306.9185586-.5303301.1072064-.4000996-.1302305-.8113523-.5303301-.9185587l-2.4860977-.6661479L13.3096607 12.75z"></path>
    </cdr-icon>);
  },
};
