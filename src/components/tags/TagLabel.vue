<template>
  <span>
    <span>
      <label>{{ tagname }}</label>
    </span>
    <button @click="emitDeleteTag">
      x
    </button>
  </span>
</template>

<script>
export default {
  name: "tag-label",
  props:{
    tagname: {
      type: String,
      default: ''
    }
  },
  methods: {
    emitDeleteTag() {
      this.$emit('delete-tag')
    }
  }
}
</script>