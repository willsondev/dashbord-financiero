import { describe, it, expect, vi } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import ChartComponent from '@/components/ChartComponent.vue';


vi.mock('@/store/useInstrumentStore', () => ({
  useInstrumentStore: () => ({
    selectedInstrument: {
      details: { info: { name: 'Test Instrument' } },
      history: {
        chart: [
          { datetimeLastPriceTs: 1685000000, closePrice: 10 },
          { datetimeLastPriceTs: 1685086400, closePrice: 15 },
        ],
      },
    },
  }),
}));

describe('ChartComponent', () => {
  it('renderiza correctamente el componente', () => {
    const wrapper = shallowMount(ChartComponent);
    expect(wrapper.exists()).toBe(true);
  });

  it('muestra el botón para cada periodo', () => {
    const wrapper = shallowMount(ChartComponent);
    const buttons = wrapper.findAll('button');
    expect(buttons.length).toBeGreaterThan(0);
  });
});
