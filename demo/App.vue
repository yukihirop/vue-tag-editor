<template>
  <span>
    <tag-editor :tags='tags' :type="'link'"></tag-editor>
  </span>
</template>

<script>
export default {
  data(){
    return {
      tags: ['javascript', 'ruby']
    }
  },
  mounted(){
    this.$eventHub.$on('tag-click', this.tagClick)
  },
  methods: {
    tagClick(tag){
      console.log(tag)
    }
  }
}
</script>