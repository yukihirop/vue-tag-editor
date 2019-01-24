<template>
  <span>
    <tag-editor :tags='tagLabels' :type="'label'"></tag-editor>
    <br/>
    <!-- tag-click-handler is effective only when type === 'link' -->
    <tag-editor :tags='tagLinks' :type="'link'" @handler-after-click-tag='handlerAfterClickTag'></tag-editor>
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
    handlerAfterClickTag(tag){
      alert(tag + ' is click!')
    }
  }
}
</script>