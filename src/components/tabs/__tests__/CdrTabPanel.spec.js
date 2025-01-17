import { mount } from '../../../../test/vue-jest-style-workaround.js';
import CdrTabPanel from '../CdrTabPanel.vue';

function mountTabPanel(selectedTabName) {
  return mount(CdrTabPanel, {
    propsData: { name: 'test' },
    global: {
      provide: {
        ...selectedTabName
      }
    }
  });
}

describe('CdrTabPanel', () => {
  describe('default config', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mountTabPanel()
    })
    it('renders as expected', () => {
      expect(wrapper.element).toMatchSnapshot();
    });

    it('is not active by default', () => {
      expect(wrapper.vm.isActive).toBe(false);
    });
  })

  describe('when the selectedTabName is the same as the tabPanel name', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mountTabPanel({ selectedTabName: { value: 'test' } })
    })
    it('renders as expected', () => {
      expect(wrapper.element).toMatchSnapshot();
    });

    it('is active', () => {
      expect(wrapper.vm.isActive).toBe(true);
    });
  })

  describe('when the selectedTabName is NOT the same as the tabPanel name', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mountTabPanel({ selectedTabName: { value: 'nameofsomedifferentab' } })
    })
    it('renders as expected', () => {
      expect(wrapper.element).toMatchSnapshot();
    });

    it('is not active', () => {
      expect(wrapper.vm.isActive).toBe(false);
    });
  })
});
