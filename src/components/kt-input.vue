<template lang="jade">
  .input
    i.icon-pano(:class='field.iconName')
    input(:type='field.type', :name='field.name', :placeholder='field.placeholder', :field='field.name', v-validate='field.validate')
</template>

<script>
export default {
  props: ['field']
}
</script>

<style lang="scss">
</style>
