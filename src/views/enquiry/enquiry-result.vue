<template src="./enquiry-result-template.jade" lang="jade"></template>

<script>
import wxMixin from '../../mixins/wx-mixin'
import eqMixin from './enquiry-result-mixin'

export default {
  mixins: [wxMixin, eqMixin],
  computed: {
    platformList() {
      return this.enquiry_result.inquiry_tactics_data
    }
  }
}
</script>

<style lang="scss" src="./enquiry-result.scss"></style>
