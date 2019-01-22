<template>
  <span>
    <tag-editor :tags='tags'></tag-editor>
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