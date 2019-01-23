<template>
  <span>
    <span @click="emitTagClick" ref='tagname'>
      <a>
        <span>{{ tagname }}</span>
      </a>
    </span>
    <button @click="emitDeleteTag()">
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
      this.$emit('delete-tag')
    },
    emitTagClick(){
      this.$eventHub.$emit('tag-click', this.$refs.tagname.textContent)
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