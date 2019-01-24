<template>
  <span>
    <span ref="tagname">
      <label>{{ tagname }}</label>
    </span>
    <tag-delete-button
      :tagname="tagname"
      :eventHub="eventHub"
      @delete-tag="emitDeleteTag"
     />
  </span>
</template>

<script>
import TagDeleteButton from './TagDeleteButton'

export default {
  name: "TagLabel",
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
  components: {
    TagDeleteButton: TagDeleteButton
  },
  methods: {
    emitDeleteTag(){
      this.$emit('delete-tag')
    }
  }
}
</script>