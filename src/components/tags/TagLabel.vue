<template>
  <span :class="[tagAreaClass, tagCustomClass]">
    <span
      ref="tagname"
    >
      <label :class="tagContentClass">
        {{ tagname }}
      </label>
    </span>
    <tag-delete-button
      :tagname="tagname"
      :event-hub="eventHub"
      :delete-area-class="deleteAreaClass"
      :delete-content-class="deleteContentClass"
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
      default: "",
      required: true
    },
    eventHub: {
      type: Object,
      default(){
        return null
      },
      required: true
    },
    tagAreaClass: {
      type: String,
      default: "",
      required: true
    },
    tagContentClass: {
      type: String,
      default: "",
      required: true
    },
    deleteAreaClass: {
      type: String,
      default: "",
      required: true
    },
    deleteContentClass: {
      type: String,
      default: "",
      required: true
    },
    tagCustomClass: {
      type: String,
      default: "",
      required: true
    }
  },
  methods: {
    emitDeleteTag(){
      this.$emit('delete-tag')
    }
  }
}
</script>