<template src="./template.html"></template>

<script>
import mixin from './mixin'

export default {
  mixins: [mixin],
  methods: {
    updateView() {
      this.visible.shareholder_type = !this.filter.finance_subject_listed
      this.visible.guarantee_subject = this.filter.guarantee
    }
  },
  data() {
    return {
      visible: {
        shareholder_type: false,
        guarantee_subject: false
      },
      filter: {
        amount: '',
        finance_subject_listed: true,
        duration: '',
        guarantee: false,
        guarantee_subject: []
      },

      fields: [{
        name: '*融资规模',
        group: 'group1',
        key: 'amount',
        type: 'input',
        format: 'wy',
        validate: {
          required: true,
          pattern: {
            rule: '/^\\d+$/',
            message: '请填写数字'
          }
        },
        unit: '万元'
      }, {
        name: '*融资期限',
        group: 'group1',
        key: 'duration',
        type: 'input',
        validate: {
          required: true,
          pattern: {
            rule: '/^\\d+$/',
            message: '请填写数字'
          }
        },
        unit: '个月'
      }, {
        name: '融资主体为上市公司',
        group: 'group2',
        key: 'finance_subject_listed',
        type: 'switch',
        validate: {
          maxlength: 120
        }
      }, {
        name: '股东类型',
        group: 'group2',
        key: 'shareholder_type',
        type: 'select',
        validate: {
          maxlength: 120
        },
        options: [{
          key: 'country_company',
          value: '国企'
        }, {
          key: 'centre_company',
          value: '央企'
        }, {
          key: 'public_company',
          value: '上市公司'
        }, {
          key: 'other',
          value: '其他'
        }]
      }, {
        name: '第三方担保',
        group: 'group3',
        key: 'guarantee',
        type: 'switch',
        validate: {
          maxlength: 120
        }
      }, {
        name: '第三方担保主体',
        group: 'group3',
        key: 'guarantee_subject',
        type: 'checkboxs',
        validate: {
          required: true
        },
        options: [{
          key: 'guarantee_company',
          value: '担保公司'
        }, {
          key: 'isurance_company',
          value: '保险公司'
        }, {
          key: 'public_company',
          value: '上市公司'
        }, {
          key: 'country_company',
          value: '大型国企'
        }, {
          key: 'centre_company',
          value: '央企'
        }, {
          key: 'land_agent',
          value: '大型房地产商'
        }, {
          key: 'other',
          value: '其他'
        }]
      }]

    }
  }
}
</script>
