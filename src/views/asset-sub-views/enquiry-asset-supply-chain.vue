<template src="./template.html"></template>

<script>
import mixin from './mixin'

export default {
  mixins: [mixin],
  methods: {
    updateView() {
      // this.visible.developer_type = this.filter.rank === 'no_rank'
      // this.visible.guarantee = this.filter.rank === '50top'
      this.visible.guarantee_subject = this.filter.guarantee
    }
  },
  data() {
    return {
      type: 'supply_chain',
      visible: {
        // guarantee: false,
        // developer_type: false,
        guarantee_subject: false
      },
      filter: {
        amount: '',
        duration: '',
        rank: '',
        developer_type: '',
        can_confirm_right: false,
        can_provide_guarantee: false,
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
        name: '核心企业类型',
        group: 'group2',
        key: 'developer_type',
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
        name: '核心企业可以确权',
        group: 'group2',
        key: 'can_confirm_right',
        type: 'switch',
        validate: {
          maxlength: 120
        }
      }, {
        name: '核心企业可以提供担保',
        group: 'group2',
        key: 'can_provide_guarantee',
        type: 'switch',
        validate: {
          maxlength: 120
        }
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
