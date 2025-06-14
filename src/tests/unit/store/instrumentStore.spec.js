import { setActivePinia, createPinia } from 'pinia'
import { useInstrumentStore } from '../../../store/useInstrumentStore'
import { describe, it, expect, beforeEach } from 'vitest'

const mockInstrumentData = {
  info: {
    name: 'IPSA',
    shortName: 'IPSA',
    countryName: 'Chile',
    codeInstrument: 'IPSA'
  },
  constituents: [
    {
      codeInstrument: 'AGUAS-A',
      name: 'AGUAS ANDINAS S.A., SERIE A',
      shortName: 'AGUAS-A',
      pctDay: 0,
      lastPrice: 272,
      tend: 'same'
    },
    {
      codeInstrument: 'ANDINA-B',
      name: 'EMBOTELLADORA ANDINA S.A. SERIE B',
      shortName: 'ANDINA-B',
      pctDay: -0.3517,
      lastPrice: 2805,
      tend: 'down'
    }
  ]
}

describe('Instrument Store - Estado Global', () => {
  let store

  beforeEach(() => {
    setActivePinia(createPinia())
    store = useInstrumentStore()

    store.instrumentList = mockInstrumentData.constituents
    store.selectedInstrument = {
      base: mockInstrumentData.info,
      constituents: mockInstrumentData.constituents
    }
  })

  it('debe cargar la lista de instrumentos y seleccionar "IPSA" por defecto', () => {
    expect(store.instrumentList.length).toBeGreaterThan(0)
    expect(store.selectedInstrument).not.toBeNull()
    expect(store.selectedInstrument.base.codeInstrument).toBe('IPSA')
  })

  it('debe permitir seleccionar un nuevo instrumento', () => {
    const newInstrument = {
      base: {
        name: 'CLP',
        shortName: 'CLP',
        countryName: 'Chile',
        codeInstrument: 'CLP'
      },
      constituents: []
    }

    store.selectedInstrument = newInstrument

    expect(store.selectedInstrument.base.codeInstrument).toBe('CLP')
  })

  it('debe cambiar el período actual y reflejarlo en el estado', () => {
    store.currentPeriod = '1M'
    expect(store.currentPeriod).toBe('1M')
  })

  it('debe actualizar el término de búsqueda y afectar el getter filteredInstrumentList', () => {
    store.searchTerm = 'embotelladora'

    const filtered = store.filteredInstrumentList
    expect(filtered.length).toBe(1)
    expect(filtered[0].shortName.toLowerCase()).toContain('andina-b')
  })
})
