<template>
  <span>
    <span v-for='(tag, index) in tags'>
      <tag-label v-if='isLabel' :tagname='tag' @delete-tag='deleteTag(index)'></tag-label>
      <tag-link v-if='isLink' :tagname='tag' @delete-tag='deleteTag(index)'></tag-link>
    </span>
  </span>
</template>

<script>
import TagLabel from "./tags/TagLabel.vue"
import TagLink from "./tags/TagLink.vue"

export default {
  name: "tags",
  props: {
    tags: {
      type: Array,
      default: []
    },
    type: {
      type: String,
      default: 'label'
    }
  },
  components: {
    TagLabel: TagLabel,
    TagLink: TagLink
  },
  methods: {
    deleteTag(index){
      this.tags.splice(index, 1)
    }
  },
  computed:{
    isLabel: function() {
      return this.type === 'label'
    },
    isLink: function() {
      return this.type === 'link'
    }
  }
}
</script>