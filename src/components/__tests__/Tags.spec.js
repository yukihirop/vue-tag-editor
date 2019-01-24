import { createLocalVue, shallowMount } from '@vue/test-utils'
import Tags from '../Tags'

const localVue = createLocalVue()

describe('Tags', () => {
  const wrapper = shallowMount(Tags,{
    localVue,
    propsData:{
      tags: ['javascript', 'ruby']
    }
  })

  it('correct name options', () => {
    expect(wrapper.vm.$options.name).toBe('Tags')
  })

  it('correct default props', () => {
    expect(wrapper.props().type).toBe('')
  })

  it('renders correctly (snapshots)', () => {
    expect(wrapper.element).toMatchSnapshot()
  })

  describe('renders the correct markup', () => {
    describe('when type is label', () => {
      beforeEach(() => {
        wrapper.setProps({
          type: 'label'
        })
      })

      it('renders the tag-label component', () => {
        expect(wrapper.html()).toContain("javascript")
        expect(wrapper.html()).toContain("ruby")
      })
    })

    describe('when type is link', () => {
      beforeEach(() => {
        wrapper.setProps({
          type: 'link'
        })
      })

      it('renders the tag-link component', () => {
        expect(wrapper.html()).toContain("javascript")
        expect(wrapper.html()).toContain("ruby")
      })
    })
  })
})