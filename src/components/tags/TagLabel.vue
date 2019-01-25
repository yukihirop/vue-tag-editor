<template>
  <span :class="[tagAreaClass, backgroundColorClass]">
    <span
      ref="tagname">
      <label :class="tagContentClass">{{ tagname }}</label>
    </span>
    <tag-delete-button
      :tagname="tagname"
      :event-hub="eventHub"
      :deleteAreaClass="deleteAreaClass"
      :deleteContentClass="deleteContentClass"
      @delete-tag="emitDeleteTag"
    />
  </span>
</template>

<script>
import TagDeleteButton from './TagDeleteButton'

export default {
  name: "TagLabel",
  components: {
    TagDeleteButton: TagDeleteButton
  },
  props:{
    tagname: {
      type: String,
      default: ''
    },
    eventHub: {
      type: Object,
      default(){
        return null
      }
    },
    tagAreaClass: {
      type: String,
      default: ""
    },
    tagContentClass: {
      type: String,
      default: ""
    },
    deleteAreaClass: {
      type: String,
      default: ""
    },
    deleteContentClass: {
      type: String,
      default: ""
    },
    backgroundColorClass: {
      type: String,
      default: ""
    }
  },
  methods: {
    emitDeleteTag(){
      this.$emit('delete-tag')
    }
  }
}
</script>