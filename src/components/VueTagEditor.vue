<template>
  <span>
    <tags
      :tags="tags"
      :type="type"
      :event-hub="eventHub"
      :tag-area-class="tagAreaClass"
      :tag-content-class="tagContentClass"
      :delete-area-class="deleteAreaClass"
      :delete-content-class="deleteContentClass"
      :tag-custom-class="tagCustomClass"
    />
    <input
      v-model="tag"
      :class="inputContentClass"
      :placeholder="placeholder"
      @keyup.enter="inputTagWithEmit"
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
      },
      required: false
    },
    type: {
      type: String,
      default: 'label',
      required: false
    },
    tagAreaClass: {
      type: String,
      default: "",
      required: false
    },
    tagContentClass: {
      type: String,
      default: "",
      required: false
    },
    deleteAreaClass: {
      type: String,
      default: "",
      required: false
    },
    deleteContentClass: {
      type: String,
      default: "",
      required: false
    },
    inputContentClass: {
      type: String,
      default: "",
      required: false
    },
    tagCustomClass: {
      type: String,
      default: "",
      required: false
    },
    placeholder: {
      type: String,
      default: " Add tags...",
      required: false
    }
  },
  data(){
    return {
      tag: '',
      isAddTag: false,
      eventHub: new Vue()
    }
  },
  mounted(){
    this.eventHub.$on('click-tag', this._emitClickTag)
    this.eventHub.$on('delete-tag', this._emitDeleteTag)
  },
  methods: {
    inputTagWithEmit(){
      var tag = this.tag
      if (this._enableAdd(this.tag)) {
        this.tags.push(this.tag)
        this.isAddTag = true
      }
      this.tag = null

      this.$nextTick(() => {
        this.$emit('handler-after-input-tag', tag, this.isAddTag)
        this.isAddTag = false
      })
    },
    _enableAdd(tag){
      return (this.tags.indexOf(tag) == -1) && tag != undefined || ''
    },
    _emitClickTag(tag){
      this.$emit('handler-after-click-tag', tag)
    },
    _emitDeleteTag(tag){
      this.$emit('handler-after-delete-tag', tag)
    }
  }
}
</script>