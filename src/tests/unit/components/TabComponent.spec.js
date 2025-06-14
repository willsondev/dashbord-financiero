import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import TabComponent from '@/components/TabComponent.vue'

describe('TabComponent', () => {
  it('renderiza todas las pestañas', () => {
    const wrapper = mount(TabComponent)
    const buttons = wrapper.findAll('button')
    const tabs = ['IPSA', 'IGPA', 'NASDAQ', 'DOW JONES', 'SP/BVL']

    expect(buttons.length).toBe(tabs.length)
    tabs.forEach((tab, i) => {
      expect(buttons[i].text()).toBe(tab)
    })
  })

  it('la pestaña inicial activa es "IPSA"', () => {
    const wrapper = mount(TabComponent)
    const activeButton = wrapper.find('button.active')
    expect(activeButton.exists()).toBe(true)
    expect(activeButton.text()).toBe('IPSA')
  })

  it('cambia la pestaña activa al hacer clic', async () => {
    const wrapper = mount(TabComponent)
    const buttons = wrapper.findAll('button')

   
    expect(buttons[0].classes()).toContain('active')

   
    await buttons[2].trigger('click')

   
    expect(buttons[2].classes()).toContain('active')

    expect(buttons[0].classes()).not.toContain('active')
  })
})
