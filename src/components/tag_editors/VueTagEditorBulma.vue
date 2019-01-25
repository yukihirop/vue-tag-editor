<template>
  <span>
    <tags
      :tags="tags"
      :type="type"
      :event-hub="eventHub"
      :tagAreaClass="tagAreaClass"
      :tagContentClass="tagContentClass"
      :deleteAreaClass="deleteAreaClass"
      :deleteContentClass="deleteContentClass"
      :backgroundColorClass="backgroundColorClass"
    />
    <input
      :class="inputContentClass"
      v-model="tag"
      placeholder="Add tags..."
      @keyup.enter="inputTagWithEmit"
    >
  </span>
</template>

<script>
import Vue from 'vue'
import Tags from '../Tags.vue'

export default {
  name: 'VueTagEditorBulma',
  components:{
    Tags: Tags
  },
  props: {
    tags:{
      type: Array,
      default(){
        return []
      }
    },
    type: {
      type: String,
      default: 'label'
    },
    backgroundColorClass: {
      type: String,
      default: ""
    },
    inputContentClass: {
      type: String,
      default: ""
    }
  },
  data(){
    return {
      tag: '',
      isAddTag: false,
      eventHub: new Vue(),
      tagAreaClass: "tagArea",
      tagContentClass: "tagContent",
      deleteAreaClass: "deleteArea",
      deleteContentClass: "deleteContent"
    }
  },
  mounted(){
    this.eventHub.$on('click-tag', this._emitClickTag)
    this.eventHub.$on('delete-tag', this._emitDeleteTag)
  },
  methods: {
    inputTagWithEmit(){
      var tag = this.tag
      if (this._enableAdd(this.tag)) {
        this.tags.push(this.tag)
        this.isAddTag = true
      }
      this.tag = null

      this.$nextTick(() => {
        this.$emit('handler-after-input-tag', tag, this.isAddTag)
        this.isAddTag = false
      })
    },
    _enableAdd(tag){
      return (this.tags.indexOf(tag) == -1) && tag != undefined || ''
    },
    _emitClickTag(tag){
      this.$emit('handler-after-click-tag', tag)
    },
    _emitDeleteTag(tag){
      this.$emit('handler-after-delete-tag', tag)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/sass/bulma.scss";

/deep/ .tagArea {
  @extend .tag:not(body);
  @extend .is-primary;
  padding: 2px 4px 2px 4px;
  margin: 2px 4px 2px 0px;
}
/deep/ .tagContent {
}
/deep/ .deleteArea {
  @extend .is-primary;
  background-color: transparent;
  border: none;
}
/deep/ .deleteContent {
  @extend .is-primary;
  color: white;
}
</style>>