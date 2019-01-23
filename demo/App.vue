<template>
  <span>
    <tag-editor :tags='tagLabels' :type="'label'"></tag-editor>
    <br/>
    <!-- tag-click-handler is effective only when type === 'link' -->
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