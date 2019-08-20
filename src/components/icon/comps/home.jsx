
import CdrIcon from 'componentsdir/icon/CdrIcon';

export default {
  name: 'IconHome',
  components: {
    CdrIcon,
  },
  extends: CdrIcon,
  render() {
    return (<cdr-icon {...this.$props}>
      {this.$slots.default}
      <path d="M19 12.1767998V19c0 .2761424-.1119288.5261424-.2928932.7071068C18.5261424 19.8880712 18.2761424 20 18 20h-4c-.2761424 0-.5261424-.1119288-.7071068-.2928932C13.1119288 19.5261424 13 19.2761424 13 19v-5h-2v5c0 .2761424-.1119288.5261424-.2928932.7071068C10.5261424 19.8880712 10.2761424 20 10 20H6c-.27614237 0-.52614237-.1119288-.70710678-.2928932C5.11192881 19.5261424 5 19.2761424 5 19v-6.8266463l-.30113455.2524349c-.01741446.0168824-.03556479.0332593-.05444722.0490881-.42348861.3550018-1.05486134.2998178-1.41021046-.1232568-.35189923-.4189673-.30114503-1.0416025.11114727-1.398415l-.00177978-.0021189 8.00055124-6.7066978c.1775628-.15420846.3992783-.23670056.6241848-.24389615.1635892-.00442683.3232032.02920393.468479.09946773.0725727.03521688.1420249.07983206.2066379.13399578.0156171.01309152.0307334.02655806.0453469.04037535.0031174.00290052.0061957.00586146.0092587.00884554l7.944381 6.65961135c.4234886.3550018.4787266.9857574.1233774 1.4088321-.3553491.4230746-.9867218.4782586-1.4102104.1232568L19 12.1767998zm-2-1.6765589l-5.0020555-4.19312034L7 10.4967948V18h2v-5c0-.2761424.11192881-.5261424.29289322-.7071068C9.47385763 12.1119288 9.72385763 12 10 12h4c.2761424 0 .5261424.1119288.7071068.2928932C14.8880712 12.4738576 15 12.7238576 15 13v5h2v-7.4997591z"></path>
    </cdr-icon>);
  },
};
