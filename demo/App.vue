<template>
  <span>
    <tag-editor :tags='tagLabels' :type="'label'" @tag-click-handler='tagClick'></tag-editor>
    <br/>
    <tag-editor :tags='tagLinks' :type="'link'" @tag-click-handler='tagClick'></tag-editor>
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
    tagClick(tag){
      alert(tag + ' is click!')
    }
  }
}
</script>