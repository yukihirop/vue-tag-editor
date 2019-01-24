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
      :eventHub="eventHub"
      @delete-tag="emitDeleteTag"
     />
  </span>
</template>

<script>
import TagDeleteButton from './TagDeleteButton'

export default {
  name: "TagLink",
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
  components: {
    TagDeleteButton: TagDeleteButton
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