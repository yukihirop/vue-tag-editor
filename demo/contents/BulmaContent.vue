<template>
  <div>
    <h2>Bulma Style</h2>
    <ul>
      <li>use (Vue)TagEditorBulma component</li>
      <li>set tag background-color gray when type is link</li>
      <li>Set tag color white when type is link</li>
      <li>Set input border none when type is link</li>
    </ul>
    <span>
      <h4>type: label</h4>
      <!-- do not set css -->
      <div class="tagEditor">
        <tag-editor-bulma
          :tags="tagLabels"
          :type="'label'"
          :tag-custom-class="'tagLabelCustom'"
          @handler-after-input-tag="handlerAfterInputTag"
          @handler-after-delete-tag="handlerAfterDeleteTag"
        />
      </div>
      <!-- handler-after-click-tag is effective only when type === 'link' -->
      <!-- if set css, set :inputContentClass -->
      <h4>type: link</h4>
      <div class="tagEditor">
        <tag-editor-bulma
          :tags="tagLinks"
          :type="'link'"
          :tag-custom-class="'tagLinkCustom'"
          :input-content-class="'inputContent'"
          @handler-after-click-tag="handlerAfterClickTag"
          @handler-after-input-tag="handlerAfterInputTag"
          @handler-after-delete-tag="handlerAfterDeleteTag"
        />
      </div>
    </span>
  </div>
</template>

<script>
export default {
  data(){
    return {
      tagLabels: ['javascript', 'ruby'],
      tagLinks:  ['javascript', 'ruby']
    }
  },
  methods: {
    // Only one argument
    handlerAfterClickTag(tag){
      alert(tag + ' is click!')
    },
    // Only two argument
    handlerAfterInputTag(tag, isAddTag){
      if (isAddTag === true) {
        console.log(tag + ' is added!')
      } else {
        console.log(tag + ' isn\'t added')
      }
    },
    // Only one argument
    handlerAfterDeleteTag(tag){
      console.log(tag + ' is deleted!')
    }
  }
}
</script>

<style scoped="true">
.tagEditor {
  border: 1px solid gray;
  margin: 12px;
  padding: 6px;
}
/deep/ .inputContent {
  border: none;
  height: 16px;
}
/deep/ .tagLabelCustom {
}
/deep/ .tagLinkCustom {
  background-color: gray !important;
  color: white !important;
}
</style>