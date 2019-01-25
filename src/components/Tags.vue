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
        :tag-area-class="tagAreaClass"
        :tag-content-class="tagContentClass"
        :delete-area-class="deleteAreaClass"
        :delete-content-class="deleteContentClass"
        :tag-custom-class="tagCustomClass"
        @delete-tag="deleteTag(index)"
      />
      <tag-link
        v-if="isLink"
        :tagname="tag"
        :event-hub="eventHub"
        :tag-area-class="tagAreaClass"
        :tag-content-class="tagContentClass"
        :delete-area-class="deleteAreaClass"
        :delete-content-class="deleteContentClass"
        :tag-custom-class="tagCustomClass"
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
      },
      required: false
    },
    type: {
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
    tagAreaClass: {
      type: String,
      default: "",
      required: true
    },
    tagContentClass: {
      type: String,
      default: "",
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
    },
    tagCustomClass: {
      type: String,
      default: "",
      required: true
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