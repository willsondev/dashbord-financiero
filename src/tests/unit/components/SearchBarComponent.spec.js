import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import SearchBarComponent from '@/components/SearchBarComponent.vue'


const updateSearchTerm = vi.fn()

vi.mock('@/store/useInstrumentStore', () => {
  return {
    useInstrumentStore: () => ({
      searchTerm: '',
      updateSearchTerm,
    }),
  }
})

describe('SearchBarComponent', () => {
  beforeEach(() => {
    updateSearchTerm.mockClear()
  })

  it('muestra el valor inicial del store.searchTerm en el input', () => {
    const wrapper = mount(SearchBarComponent)
    const input = wrapper.find('input')
    expect(input.element.value).toBe('') 
  })

  it('llama a updateSearchTerm con el valor correcto al escribir en el input', async () => {
    const wrapper = mount(SearchBarComponent)
    const input = wrapper.find('input')

    await input.setValue('guitarra')

    expect(updateSearchTerm).toHaveBeenCalledTimes(1)
    expect(updateSearchTerm).toHaveBeenCalledWith('guitarra')
  })
})
