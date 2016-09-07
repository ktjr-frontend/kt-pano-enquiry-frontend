<template lang="jade">
  //- .input
  //-   i.icon-pano(:class='field.iconName')
  //-   input(:type='field.type', :name='field.name', :placeholder='field.placeholder', :field='field.name', v-validate='field.validate')

  .input(v-validate-class='', v-kt-toggle-onfucusblur='', child='input', toggle-class='focus', :class="[{'not-empty': !!user[field.name]}, field.classNames]")
    i.icon-pano(:class='field.iconName')
    input(autocomplete='off', initial='off', @input='validate(field.name)', detect-change='off', detect-blur='off', :type='field.type', v-model='user[field.name]', :name='field.name', :placeholder='field.placeholder', :field='field.name', v-validate='field.validate')
    .status
      i.weui_icon.weui_icon_clear(v-touch:tap='clearField(field.name)')
      i.weui_icon.weui_icon_warn(v-touch:tap='showError(field.name)')
      //- <i class="weui_icon weui_icon_success"></i>
</template>

<script>
export default {
  props: ['field', 'user']
}
</script>

<style lang="scss">
</style>
