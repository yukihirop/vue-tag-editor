<template>
  <div>
    <h2>Custom Style</h2>
    <ul>
      <li>use (Vue)TagEditor component</li>
    </ul>
    <span>
      <h4>type: label</h4>
      <div class="tagEditor">
        <tag-editor
          :tags="tagLabels"
          :type="'label'"
          :tag-area-class="'tagArea'"
          :tag-content-class="'tagContent'"
          :delete-area-class="'deleteArea'"
          :delete-content-class="'deleteContent'"
          :input-content-class="'inputContent'"
          :tag-custom-class="'tagCustom'"
          @handler-after-input-tag="handlerAfterInputTag"
          @handler-after-delete-tag="handlerAfterDeleteTag"
        />
      </div>
      <!-- handler-after-click-tag is effective only when type === 'link' -->
      <!-- if set css, set :tagAreaClass, :tagContentClass, :deleteAreaClass, :deleteContentClass, :inputContentClass -->
      <h4>type: link</h4>
      <div class="tagEditor">
        <tag-editor
          :tags="tagLinks"
          :type="'link'"
          :tag-area-class="'tagArea'"
          :tag-content-class="'tagContent'"
          :delete-area-class="'deleteArea'"
          :delete-content-class="'deleteContent'"
          :input-content-class="'inputContent'"
          :tag-custom-class="'tagCustom'"
          :placeholder="' you can set custom message'"
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
/deep/ .tagArea {
  align-items: center;
  border-radius: 4px;
  white-space: nowrap;
  padding-left: 0.75em;
  padding-right: 0.75em;
  height: 2em;
  line-height: 1.5;
  font-size: 0.75rem;
  display: inline-flex;
  background-color: #99cc00;
}
/deep/ .tagContent {
  color: white;
}
/deep/ .tagCustom {
}
/deep/ .deleteArea {
  background-color: #99cc00;
  border: none;
}
/deep/ .deleteContent {
  margin: 2px 0;
  padding: 2px 0;
  color: white;
}
/deep/ .inputContent {
  padding: 2px 2px;
  border: 0.5px solid gray;
  width: 200px;
  height: 16px;
}
</style>