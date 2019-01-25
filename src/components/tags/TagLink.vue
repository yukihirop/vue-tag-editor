<template>
  <span :class="[tagAreaClass, tagCustomClass]">
    <span
      ref="tagname"
      @click="emitClickTag"
    >
      <a :class="tagContentClass">
        <span>{{ tagname }}</span>
      </a>
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
  name: "TagLink",
  components: {
    TagDeleteButton: TagDeleteButton
  },
  props:{
    tagname:{
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
    tagCustomClass: {
      type: String,
      default: ""
    }
  },
  methods: {
    emitDeleteTag(){
      this.$emit('delete-tag')
    },
    emitClickTag(){
      this.eventHub.$emit('click-tag', this.$refs.tagname.textContent)
    }
  }
}
</script>

<style scoped="true">
a {
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
  cursor: pointer;
}
</style>