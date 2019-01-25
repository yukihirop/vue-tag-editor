import { createLocalVue, shallowMount } from '@vue/test-utils'
import VueTagEditorBulma from '../VueTagEditorBulma'

const localVue = createLocalVue()

describe('VueTagEditorBulma', () => {
  const wrapper = shallowMount(VueTagEditorBulma, {
    localVue,
    propsData: {
      tags: ['javascript', 'ruby']
    }
  })

  it('correct name options', () => {
    expect(wrapper.vm.$options.name).toBe('VueTagEditorBulma')
  })

  it('correct default props', () => {
    expect(wrapper.props().type).toBe('label')
  })

  it('renders correctly (snapshots)', () => {
    expect(wrapper.element).toMatchSnapshot()
  })

  it('render the correct markup', () => {
    expect(wrapper.html()).toContain("tags=\"javascript,ruby\" type=\"label\"")
    expect(wrapper.html()).toContain("Add tags...")
  })

  it('has a input', () => {
    expect(wrapper.contains('input')).toBe(true)
  })

  describe('Cursor up create tag', () => {
    const input = wrapper.find('input')

    // Can not test update props
    // https://github.com/vuejs/vue-test-utils/issues/480#issuecomment-374744653
    describe('input tag do not exists', () => {
      it('create tag', (done) => {
        expect.assertions(3)

        input.setValue('swift')
        wrapper.vm.inputTagWithEmit()

        wrapper.vm.$nextTick(() => {
          expect(wrapper.emitted('handler-after-input-tag')).toBeTruthy()
          expect(wrapper.emitted('handler-after-input-tag').length).toEqual(1)
          expect(wrapper.emitted('handler-after-input-tag')[0]).toEqual(['swift', true])
          done()
        })
      })
    })
  })

  describe('should emitted after click tag', () => {
    wrapper.vm._emitClickTag('test')
    expect(wrapper.emitted('handler-after-click-tag')).toBeTruthy()
    expect(wrapper.emitted('handler-after-click-tag').length).toEqual(1)
    expect(wrapper.emitted('handler-after-click-tag')[0]).toEqual(['test'])
  })
})