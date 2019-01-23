<template>
  <span>
    <span v-for="(tag, index) in tags">
      <tag-label
        v-if="isLabel"
        :tagname="tag"
        @delete-tag="deleteTag(index)"
      />
      <tag-link
        v-if="isLink"
        :tagname="tag"
        :event-hub="eventHub"
        @delete-tag="deleteTag(index)"
      />
    </span>
  </span>
</template>

<script>
import TagLabel from "./tags/TagLabel.vue"
import TagLink from "./tags/TagLink.vue"

export default {
  name: "Tags",
  components: {
    TagLabel: TagLabel,
    TagLink: TagLink
  },
  props: {
    tags: {
      type: Array,
      default: []
    },
    type: {
      type: String,
      default: ''
    },
    eventHub: {
      type: Object
    }
  },
  computed:{
    isLabel: function() {
      return this.type === 'label'
    },
    isLink: function() {
      return this.type === 'link'
    }
  },
  methods: {
    deleteTag(index){
      this.tags.splice(index, 1)
    }
  }
}
</script>