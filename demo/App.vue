<template>
  <span>
    <none-style-content></none-style-content>
    <br/>
    <custom-style-content></custom-style-content>
    <br/>
    <bulma-content></bulma-content>
  </span>
</template>

<script>
import NoneStyleContent from "./contents/NoneStyleContent"
import CustomStyleContent from "./contents/CustomStyleContent"
import BulmaContent from "./contents/BulmaContent"

export default {
  components: {
    NoneStyleContent: NoneStyleContent,
    CustomStyleContent: CustomStyleContent,
    BulmaContent: BulmaContent
  }
}
</script>