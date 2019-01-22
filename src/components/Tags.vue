<template>
  <span>
    <span v-for='(tag, index) in tags'>
      <tag-label :tagname='tag' @delete-tag='deleteTag(index)'></tag-label>
    </span>
  </span>
</template>

<script>
import TagLabel from "./tags/TagLabel.vue"

export default {
  name: "tags",
  props: {
    tags: {
      type: Array,
      default: []
    }
  },
  components: {
    TagLabel: TagLabel
  },
  methods: {
    deleteTag(index){
      this.tags.splice(index, 1)
    }
  }
}
</script>