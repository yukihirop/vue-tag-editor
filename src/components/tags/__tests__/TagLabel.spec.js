import { createLocalVue, shallowMount } from '@vue/test-utils'
import TagLabel from '../TagLabel'

const localVue = createLocalVue()

describe('TagLabel', () => {
  const wrapper = shallowMount(TagLabel, {
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
    expect(wrapper.html()).toContain("tag-delete-button-stub")
  })

  it('has a delete button', () => {
    expect(wrapper.contains('tag-delete-button-stub')).toBe(true)
  })

  it('delete button click should call emitDeleteTag', () => {
    wrapper.vm.emitDeleteTag()

    expect(wrapper.emitted('delete-tag')).toBeTruthy()
    expect(wrapper.emitted('delete-tag').length).toBe(1)
  })
})