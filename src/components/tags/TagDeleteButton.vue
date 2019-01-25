<template>
  <span>
    <button
      :class="deleteAreaClass"
      @click="emitDeleteTag"
    >
      <span :class="deleteContentClass">
        x
      </span>
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
    },
    deleteAreaClass: {
      type: String,
      default: ""
    },
    deleteContentClass: {
      type: String,
      default: ""
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