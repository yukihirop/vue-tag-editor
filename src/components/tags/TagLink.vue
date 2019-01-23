<template>
  <span>
    <span>
      <a>
        <span>{{ tagname }}</span>
      </a>
    </span>
    <button @click="emitDeleteTag">
      x
    </button>
  </span>
</template>

<script>
export default {
  name: "tag-link",
  props:{
    tagname:{
      type: String,
      default: ''
    }
  },
  methods: {
    emitDeleteTag(){
      this.$emit('delete-tag', this.$refs.text)
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