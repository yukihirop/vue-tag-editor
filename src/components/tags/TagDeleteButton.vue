<template>
  <span>
    <button @click="emitDeleteTag">
      x
    </button>
  </span>
</template>

<script>
export default {
  name: "TagDeleteButton",
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
    emitDeleteTag() {
      this.$emit('delete-tag')
      this.eventHub.$emit('delete-tag', this.tagname)
    }
  }
}
</script>