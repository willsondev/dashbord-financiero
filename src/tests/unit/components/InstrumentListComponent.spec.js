import { mount } from '@vue/test-utils'
import { reactive } from 'vue'
import { vi } from 'vitest'
import InstrumentListComponent from '@/components/InstrumentListComponent.vue'

const storeMock = reactive({
  filteredInstrumentList: []
})

vi.mock('@/store/useInstrumentStore', () => ({
  useInstrumentStore: () => storeMock
}))

const InstrumentItemComponentStub = {
  name: 'InstrumentItemComponent',
  props: ['instrument'],
  template: '<div class="instrument-item">{{ instrument.name }}</div>'
}

describe('InstrumentListComponent básico con Pinia', () => {
  beforeEach(() => {
    storeMock.filteredInstrumentList = []
  })

  it('actualiza la lista cuando cambia el store.filteredInstrumentList', async () => {
    const wrapper = mount(InstrumentListComponent, {
      global: {
        stubs: { InstrumentItemComponent: InstrumentItemComponentStub }
      }
    })

    expect(wrapper.findAll('.instrument-item').length).toBe(0)

    storeMock.filteredInstrumentList = [{ codeInstrument: 'E5', name: 'Instrumento E5' }]
    await wrapper.vm.$nextTick()

    const items = wrapper.findAll('.instrument-item')
    console.log(wrapper.html())  

    expect(items.length).toBe(1)
    expect(items[0].text()).toBe('Instrumento E5')
  })
})
