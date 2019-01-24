import { createLocalVue, mount } from '@vue/test-utils'
import TagDeleteButton from '../TagDeleteButton'

const localVue = createLocalVue()

const wrapperEventHub = mount(TagDeleteButton, {
  localVue,
  propsData: {
    tagname: 'test'
  }
})
const eventHub = wrapperEventHub.vm

describe('TagDeleteButton', () => {
  const wrapper = mount(TagDeleteButton, {
    localVue,
    propsData: {
      tagname: 'test',
      eventHub: eventHub
    }
  })

  it('correct name options', () => {
    expect(wrapper.vm.$options.name).toBe('TagDeleteButton')
  })

  it('renders correctly (snapshots)', () => {
    expect(wrapper.element).toMatchSnapshot()
  })

  it('renders the correct markup', () => {
    expect(wrapper.html()).toContain("x")
  })

  it('has a delete button', () => {
    expect(wrapper.contains('button')).toBe(true)
  })

  it('delete button click should call emitDeleteTag', () => {
    const button = wrapper.find('button')
    button.trigger('click')

    expect(wrapper.emitted('delete-tag')).toBeTruthy()
    expect(wrapper.emitted('delete-tag').length).toBe(1)
    expect(wrapperEventHub.emitted('delete-tag')).toBeTruthy()
    expect(wrapperEventHub.emitted('delete-tag').length).toBe(1)
    expect(wrapperEventHub.emitted('delete-tag')[0]).toEqual(['test'])
  })
})