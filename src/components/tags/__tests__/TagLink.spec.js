import { createLocalVue, shallowMount } from '@vue/test-utils'
import TagLink from '../TagLink'

const localVue = createLocalVue()

const wrapperEventHub = shallowMount(TagLink, {
  localVue,
  propsData: {
    tagname: 'test'
  }
})
const eventHub = wrapperEventHub.vm

describe('TagLink', () => {
  const wrapper = shallowMount(TagLink, {
    localVue,
    propsData: {
      tagname: 'test',
      eventHub: eventHub,
      tagAreaClass: 'tagAreaClass',
      tagContentClass: 'tagContentClass',
      deleteAreaClass: 'deleteAreaClass',
      deleteContentClass: 'deleteContentClass'
    }
  })

  it('correct name options', () => {
    expect(wrapper.vm.$options.name).toBe('TagLink')
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

  it('tag-click button click should call emitTagClick', () => {
    const anchor = wrapper.find({ ref: 'tagname'})
    anchor.trigger('click')

    expect(wrapperEventHub.emitted('click-tag')).toBeTruthy()
    expect(wrapperEventHub.emitted('click-tag').length).toBe(1)
    expect(wrapperEventHub.emitted('click-tag')[0]).toEqual(['test'])
  })

  it('has correct class', () => {
    expect(wrapper.classes()).toContain("tagAreaClass")
    // expect(wrapper.classes()).toContain("tagContentClass")
    // expect(wrapper.classes()).toContain("deleteAreaClass")
    // expect(wrapper.classes()).toContain("deleteContentClass")
  })
})