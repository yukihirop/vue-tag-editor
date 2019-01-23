<template>
  <span>
    <tag-editor :tags='tags' :type="'link'" @tag-click-handler='tagClick'></tag-editor>
  </span>
</template>

<script>
export default {
  data(){
    return {
      tags: ['javascript', 'ruby']
    }
  },
  methods: {
    tagClick(tag){
      console.log(tag)
    }
  }
}
</script>