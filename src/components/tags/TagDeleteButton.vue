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
    deleteAreaClass: {
      type: String,
      default: "",
      required: true
    },
    deleteContentClass: {
      type: String,
      default: "",
      required: true
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