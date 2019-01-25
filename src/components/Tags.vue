<template>
  <span>
    <span
      v-for="(tag, index) in tags"
      :key="tag.id"
    >
      <tag-label
        v-if="isLabel"
        :tagname="tag"
        :event-hub="eventHub"
        :tagAreaClass="tagAreaClass"
        :tagContentClass="tagContentClass"
        :deleteAreaClass="deleteAreaClass"
        :deleteContentClass="deleteContentClass"
        :tagCustomClass="tagCustomClass"
        @delete-tag="deleteTag(index)"
      />
      <tag-link
        v-if="isLink"
        :tagname="tag"
        :event-hub="eventHub"
        :tagAreaClass="tagAreaClass"
        :tagContentClass="tagContentClass"
        :deleteAreaClass="deleteAreaClass"
        :deleteContentClass="deleteContentClass"
        :tagCustomClass="tagCustomClass"
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
      default() {
        return []
      }
    },
    type: {
      type: String,
      default: ''
    },
    eventHub: {
      type: Object,
      default(){
        return null
      }
    },
    tagAreaClass: {
      type: String,
      default: ""
    },
    tagContentClass: {
      type: String,
      default: ""
    },
    deleteAreaClass: {
      type: String,
      default: ""
    },
    deleteContentClass: {
      type: String,
      default: ""
    },
    tagCustomClass: {
      type: String,
      default: ""
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