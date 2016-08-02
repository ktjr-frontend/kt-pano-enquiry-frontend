<template>
  <div class="input">
    <i class="icon-pano" :class="field.iconName"></i>
    <input :type="field.type" :name="field.name" :placeholder="field.placeholder" :field="field.name" v-validate="field.validate">
  </div>
</template>

<script>
export default {
  props: ['field']
}
</script>

<style lang="scss">

</style>
