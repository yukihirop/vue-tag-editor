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
    <button @click="emitDeleteTag()">
      x
    </button>
  </span>
</template>

<script>
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
  methods: {
    emitDeleteTag(){
      this.$emit('delete-tag')
      this.eventHub.$emit('delete-tag', this.$refs.tagname.textContent)
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