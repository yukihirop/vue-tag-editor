<template>
  <span>
    <span
      ref="tagname"
      @click="emitTagClick"
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
      type: Object
    }
  },
  methods: {
    emitDeleteTag(){
      this.$emit('delete-tag')
    },
    emitTagClick(){
      this.eventHub.$emit('tag-click', this.$refs.tagname.textContent)
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