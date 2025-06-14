import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'

let useInstrumentStoreMock = {
  summaryData: {
    open: 100,
    high: 120,
    low: 90,
    previousClose: 95,
    volume: 1000000,
    marketName: 'Mercado Test',
    datetimeLast: '2025-06-14 15:00',
    max52W: 130,
    min52W: 85,
    pct30D: 2.5,
    pctRelW52: -1.2,
    pctRelCY: 0.8,
  }
}


vi.mock('@/store/useInstrumentStore', () => ({
  useInstrumentStore: () => useInstrumentStoreMock
}))

import SummaryComponent from '@/components/SummaryComponent.vue'

describe('SummaryComponent', () => {
  beforeEach(() => {
    
    useInstrumentStoreMock = {
      summaryData: {
        open: 100,
        high: 120,
        low: 90,
        previousClose: 95,
        volume: 1000000,
        marketName: 'Mercado Test',
        datetimeLast: '2025-06-14 15:00',
        max52W: 130,
        min52W: 85,
        pct30D: 2.5,
        pctRelW52: -1.2,
        pctRelCY: 0.8,
      }
    }
  })

  it('muestra resumen con datos correctamente', () => {
    const wrapper = mount(SummaryComponent)
    expect(wrapper.text()).toContain('Apertura')
    expect(wrapper.text()).toContain('100')
    expect(wrapper.text()).toContain('Máximo Diario')
    expect(wrapper.text()).toContain('120')
    expect(wrapper.text()).toContain('Volumen')
    expect(wrapper.text()).toContain('1.000.000')
  })

  it('cambia a pestaña Detalles y muestra datos', async () => {
    const wrapper = mount(SummaryComponent)
    const buttons = wrapper.findAll('button')
    await buttons[1].trigger('click')
    expect(wrapper.text()).toContain('Mercado Test')
    expect(wrapper.text()).toContain('2025-06-14 15:00')

    const positive = wrapper.findAll('.positive')
    const negative = wrapper.findAll('.negative')
    expect(positive.length).toBe(2)
    expect(negative.length).toBe(1)
  })

  it('muestra placeholder si no hay datos', () => {
   
    useInstrumentStoreMock.summaryData = null

    const wrapper = mount(SummaryComponent)
    expect(wrapper.text()).toContain('No hay datos disponibles.')
  })
})
