<template>
  <span>
    <span
      ref="tagname"
      @click="emitClickTag"
    >
      <a>
        <span>{{ tagname }}</span>
      </a>
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