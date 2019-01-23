<template>
  <span>
    <tags
      :tags="tags"
      :type="type"
      :event-hub="eventHub"
    />
    <input
      v-model="tag"
      placeholder="Add tags..."
      @keyup.enter="inputTag"
    >
  </span>
</template>

<script>
import Vue from 'vue'
import Tags from './Tags.vue'

export default {
  name: 'VueTagEditor',
  components:{
    Tags: Tags
  },
  props: {
    tags:{
      type: Array,
      default(){
        return []
      }
    },
    type: {
      type: String,
      default: 'label'
    },
  },
  data(){
    return {
      tag: '',
      eventHub: new Vue()
    }
  },
  mounted(){
    this.eventHub.$on('tag-click', this._tagClick)
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
    _tagClick(tag){
      this.$emit('handler-after-click-tag', tag)
    }
  }
}
</script>