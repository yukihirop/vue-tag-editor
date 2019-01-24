import { createLocalVue, shallowMount } from '@vue/test-utils'
import TagLabel from '../TagLabel'

const localVue = createLocalVue()

describe('TagLabel', () => {
  const wrapper = shallowMount(TagLabel, {
    localVue,
    propsData: {
      tagname: 'test',
      tagAreaClass: 'tagAreaClass',
      tagContentClass: 'tagContentClass',
      deleteAreaClass: 'deleteAreaClass',
      deleteContentClass: 'deleteContentClass'
    }
  })

  it('correct name options', () => {
    expect(wrapper.vm.$options.name).toBe('TagLabel')
  })

  it('renders correctly (snapshots)', () => {
    expect(wrapper.element).toMatchSnapshot()
  })

  it('renders the correct markup', () => {
    expect(wrapper.html()).toContain("test")
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

  it('has correct class', () => {
    expect(wrapper.classes()).toContain("tagAreaClass")
    // expect(wrapper.classes()).toContain("tagContentClass")
    // expect(wrapper.classes()).toContain("deleteAreaClass")
    // expect(wrapper.classes()).toContain("deleteContentClass")
  })
})