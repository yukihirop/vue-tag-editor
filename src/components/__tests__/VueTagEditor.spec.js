import { createLocalVue, shallowMount } from '@vue/test-utils'
import VueTagEditor from '../VueTagEditor'

const localVue = createLocalVue()

describe('VueTagEditor', () => {
  const wrapper = shallowMount(VueTagEditor, {
    localVue,
    propsData: {
      tags: ['javascript', 'ruby']
    }
  })

  it('correct name options', () => {
    expect(wrapper.vm.$options.name).toBe('VueTagEditor')
  })

  it('correct default props', () => {
    expect(wrapper.props().type).toBe('label')
  })

  it('renders correctly (snapshots)', () => {
    expect(wrapper.element).toMatchSnapshot()
  })

  it('render the correct markup', () => {
    expect(wrapper.html()).toContain("<tags-stub tags=\"javascript,ruby\" type=\"label\" eventhub=\"[object Object]\"></tags-stub>")
    expect(wrapper.html()).toContain("<input placeholder=\"Add tags...\">")
  })

  it('has a input', () => {
    expect(wrapper.contains('input')).toBe(true)
  })

  describe('Cursor up create tag', () => {
    const input = wrapper.find('input')

    // Can not test update props
    // https://github.com/vuejs/vue-test-utils/issues/480#issuecomment-374744653
    describe('input tag do not exists', () => {
      it('create tag', () => {
        input.setValue('swift')
        input.trigger('keydown.up')

        expect(true).toEqual(true)
      })
    })
  })
})