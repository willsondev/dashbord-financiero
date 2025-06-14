import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { nextTick } from 'vue'
import HeaderComponent from '@/components/HeaderComponent.vue'
import { useInstrumentStore } from '@/store/useInstrumentStore'

describe('HeaderComponent - manejo de reactividad y eventos simulados', () => {
  let pinia

  beforeEach(() => {
    pinia = createPinia()
    setActivePinia(pinia)
  })

  it('actualiza la UI cuando cambia selectedInstrument en el store', async () => {
  
    const wrapper = mount(HeaderComponent, {
      global: {
        plugins: [pinia],
      },
    })


    const store = useInstrumentStore()

  
    store.selectedInstrument = null
    await nextTick()

    expect(wrapper.text()).toContain('Seleccione un instrumento.')

   
    store.selectedInstrument = {
      base: {
        name: 'Instrumento A',
        lastPrice: 150,
        pctDay: 3,
        performanceAbsolute: 4.5,
      },
      details: null,
      history: null,
    }

   
    await nextTick()
    await nextTick()

   
    wrapper.vm.$forceUpdate()
    await nextTick()

  
    expect(wrapper.text()).toContain('Valor Actual 150')
    expect(wrapper.text()).toContain('Var.% Actual 3.00%')
    expect(wrapper.text()).toContain('Var. Puntos 4.50')
  })
})
