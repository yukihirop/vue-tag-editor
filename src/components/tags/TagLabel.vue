<template>
  <span>
    <span ref="tagname">
      <label>{{ tagname }}</label>
    </span>
    <tag-delete-button
      :tagname="tagname"
      :event-hub="eventHub"
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
    }
  },
  methods: {
    emitDeleteTag(){
      this.$emit('delete-tag')
    }
  }
}
</script>