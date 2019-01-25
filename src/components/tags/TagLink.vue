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