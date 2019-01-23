import { createLocalVue, mount } from '@vue/test-utils'
import TagLabel from '../TagLabel'

const localVue = createLocalVue()

describe('TagLabel', () => {
  const wrapper = mount(TagLabel, {
    localVue,
    propsData: {
      tagname: 'test'
    }
  })

  it('correct name options', () => {
    expect(wrapper.vm.$options.name).toBe('TagLabel')
  })

  it('renders correctly (snapshots)', () => {
    expect(wrapper.element).toMatchSnapshot()
  })

  it('renders the correct markup', () => {
    expect(wrapper.html()).toContain("<span><span><label>test</label></span>")
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
  })
})