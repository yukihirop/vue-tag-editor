<template>
  <span>
    <span ref="tagname">
      <label>{{ tagname }}</label>
    </span>
    <button @click="emitDeleteTag">
      x
    </button>
  </span>
</template>

<script>
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
  methods: {
    emitDeleteTag() {
      this.$emit('delete-tag')
      this.eventHub.$emit('delete-tag', this.$refs.tagname.textContent)
    }
  }
}
</script>