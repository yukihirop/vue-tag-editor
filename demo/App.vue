<template>
  <span>
    <div>
      <h2>None Style</h2>
      <span>
        <span>
          <tag-editor
            :tags='tagLabels'
            :type="'label'"
            @handler-after-input-tag='handlerAfterInputTag'
            @handler-after-delete-tag='handlerAfterDeleteTag'
          ></tag-editor>
          <br/>
          <!-- handler-after-click-tag is effective only when type === 'link' -->
          <tag-editor
            :tags='tagLinks'
            :type="'link'"
            @handler-after-click-tag='handlerAfterClickTag'
            @handler-after-input-tag='handlerAfterInputTag'
            @handler-after-delete-tag='handlerAfterDeleteTag'
          ></tag-editor>
        </span>
      </span>
    </div>
    <div>
      <h2>Bulma</h2>
      <span>
        <span>
          <tag-editor-bulma
            :tags='tagLabelsBulma'
            :type="'label'"
            @handler-after-input-tag='handlerAfterInputTag'
            @handler-after-delete-tag='handlerAfterDeleteTag'
          ></tag-editor-bulma>
          <br/>
          <!-- handler-after-click-tag is effective only when type === 'link' -->
          <tag-editor-bulma
            :tags='tagLinksBulma'
            :type="'link'"
            @handler-after-click-tag='handlerAfterClickTag'
            @handler-after-input-tag='handlerAfterInputTag'
            @handler-after-delete-tag='handlerAfterDeleteTag'
          ></tag-editor-bulma>
        </span>
      </span>
    </div>
  </span>
</template>

<script>
export default {
  data(){
    return {
      tagLabels: ['javascript', 'ruby'],
      tagLinks:  ['javascript', 'ruby'],
      tagLabelsBulma: ['javascript', 'ruby'],
      tagLinksBulma:  ['javascript', 'ruby']
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