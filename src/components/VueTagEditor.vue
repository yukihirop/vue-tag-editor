<template>
  <span>
    <tags :tags='tags' :type='type'></tags>
    <input placeholder="Add tags..." v-model="tag" @keyup.enter="inputTag"></input>
  </span>
</template>

<script>
import Tags from "./Tags.vue"

export default {
  name: 'vue-tag-editor',
  props: {
    tags:{
      type: Array,
      default: []
    },
    type: {
      type: String,
      default: 'label'
    }
  },
  components:{
    Tags: Tags
  },
  data(){
    return {
      tag: ''
    }
  },
  methods: {
    inputTag(){
      if (this._enableAdd(this.tag)) {
        this.tags.push(this.tag)
      }
      this.tag = null
    },
    _enableAdd(tag){
      return (this.tags.indexOf(tag) == -1) && tag != undefined || ''
    },
  }
}
</script>