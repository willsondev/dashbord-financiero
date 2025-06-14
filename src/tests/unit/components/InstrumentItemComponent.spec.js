import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { vi } from 'vitest'; 
import InstrumentItemComponent from '@/components/InstrumentItemComponent.vue';
import { useInstrumentStore } from '@/store/useInstrumentStore';

describe('InstrumentItemComponent - reactividad y eventos', () => {
  let store;
  const instrumentMock = {
    codeInstrument: 'ABC',
    shortName: 'ABC',
    lastPrice: 150,
    volumeMoney: 3000000, 
    pctDay: 1.5,
    pct30D: -2.5,
    pctCY: 0,
    pct1Y: 10,
  };

  beforeEach(() => {
    setActivePinia(createPinia());
    store = useInstrumentStore();
    store.selectedInstrument = null;
    store.selectInstrument = vi.fn();  
  });

  it('Renderiza datos correctamente y responde a click y estado seleccionado', async () => {
    const wrapper = mount(InstrumentItemComponent, {
      props: { instrument: instrumentMock },
    });

    expect(wrapper.text()).toContain(instrumentMock.shortName);
    expect(wrapper.text()).toContain('150.00');
    expect(wrapper.text()).toContain('3.00');
    expect(wrapper.text()).toContain('1.50%');
    expect(wrapper.text()).toContain('-2.50%');
    expect(wrapper.text()).toContain('0.00%');
    expect(wrapper.text()).toContain('10.00%');

    expect(wrapper.find('.variation.positive').exists()).toBe(true);
    expect(wrapper.find('.variation.negative').exists()).toBe(true);

    expect(wrapper.classes('selected')).toBe(false);

    await wrapper.trigger('click');
    expect(store.selectInstrument).toHaveBeenCalledWith(instrumentMock.codeInstrument);

    store.selectedInstrument = { base: { codeInstrument: 'ABC' } };
    await wrapper.vm.$nextTick();

    expect(wrapper.classes('selected')).toBe(true);
  });
});
