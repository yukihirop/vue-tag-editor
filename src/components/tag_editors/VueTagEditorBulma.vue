<template>
  <span>
    <tags
      :tags="tags"
      :type="type"
      :event-hub="eventHub"
      :tag-area-class="'tagAreaBulma'"
      :tag-content-class="'tagContentBulma'"
      :delete-area-class="'deleteAreaBulma'"
      :delete-content-class="'deleteContentBulma'"
      :tag-custom-class="tagCustomClass"
    />
    <input
      v-model="tag"
      :class="inputContentClass"
      :placeholder="placeholder"
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
    tagCustomClass: {
      type: String,
      default: ""
    },
    inputContentClass: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: " Add tags..."
    }
  },
  data(){
    return {
      tag: '',
      isAddTag: false,
      eventHub: new Vue()
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

<style lang="scss" scoped="true">
@import "../../assets/sass/bulma.scss";

/deep/ .tagAreaBulma {
  @extend .tag:not(body);
  @extend .is-primary;
  padding: 2px 4px 2px 10px;
  margin: 2px 4px 2px 0px;
}
/deep/ .tagContentBulma {
}
/deep/ .deleteAreaBulma {
  @extend .is-primary;
  background-color: transparent;
  border: none;
}
/deep/ .deleteContentBulma {
  @extend .is-primary;
  color: white;
}
</style>>