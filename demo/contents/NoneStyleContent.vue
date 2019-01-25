<template>
  <div>
    <h2>None Style</h2>
    <ul>
      <li>use (Vue)TagEditor component</li>
    </ul>
    <span>
      <h4>type: label</h4>
      <!-- do not set css -->
      <div class="tagEditor">
        <tag-editor
          :tags="tagLabels"
          :type="'label'"
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
</style>