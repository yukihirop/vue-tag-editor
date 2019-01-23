<template>
  <span>
    <tag-editor :tags='tags' :type="'link'"></tag-editor>
  </span>
</template>

<script>
export default {
  data(){
    return {
      tags: ['javascript', 'ruby']
    }
  }
}
</script>