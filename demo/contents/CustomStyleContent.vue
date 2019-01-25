<template>
  <div>
    <h2>Custom Style</h2>
    <ul>
      <li>use (Vue)TagEditor component</li>
      <li>set tag background-color #99cc00</li>
      <li>set input border 2px solid red</li>
      <li>set delete button border none</li>
      <li>set placeholder 'you can set custom message' when type is link</li>
      <li>set input width 200px</li>
    </ul>
    <span>
      <h4>type: label</h4>
      <!-- do not set css -->
      <div class="tagEditor">
        <tag-editor
          :tags="tagLabels"
          :type="'label'"
          :tag-area-class="tagAreaClass"
          :tag-content-class="tagContentClass"
          :delete-area-class="deleteAreaClass"
          :delete-content-class="deleteContentClass"
          :input-content-class="inputContentClass"
          :tag-custom-class="tagCustomClass"
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
          :tag-area-class="tagAreaClass"
          :tag-content-class="tagContentClass"
          :delete-area-class="deleteAreaClass"
          :delete-content-class="deleteContentClass"
          :input-content-class="inputContentClass"
          :tag-custom-class="tagCustomClass"
          :placeholder="'you can set custom message'"
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
      tagLinks:  ['javascript', 'ruby'],
      tagAreaClass: "tagArea",
      tagContentClass: "tagContent",
      deleteAreaClass: "deleteArea",
      deleteContentClass: "deleteContent",
      inputContentClass: "inputContent",
      tagCustomClass: "tagCustom"
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
  margin: 4px;
  padding: 4px;
  background-color: #99cc00;
}
/deep/ .tagContent {
  color: red;
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
  color: red;
}
/deep/ .inputContent {
  border: 2px solid red;
  width: 200px;
  height: 16px;
}
</style>