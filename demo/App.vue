<template>
  <span>
    <tag-editor :tags='tagLabels' :type="'label'"></tag-editor>
    <br/>
    <!-- tag-click-handler is effective only when type === 'link' -->
    <tag-editor
      :tags='tagLinks'
      :type="'link'"
      @handler-after-click-tag='handlerAfterClickTag'
      @handler-after-input-tag='handlerAfterInputTag'
    ></tag-editor>
  </span>
</template>

<script>
export default {
  data(){
    return {
      tagLabels: ['javascript', 'ruby'],
      tagLinks:  ['javascript', 'ruby']
    }
  },
  methods: {
    // Only one argument
    handlerAfterClickTag(tag){
      alert(tag + ' is click!')
    },
    // Only two argument
    handlerAfterInputTag(tag, isAddTag){
      if (isAddTag === true) {
        console.log(tag + ' is added!')
      } else {
        console.log(tag + ' isn\'t added')
      }
    }
  }
}
</script>