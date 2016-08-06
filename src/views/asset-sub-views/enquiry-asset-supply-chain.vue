<template src="./template.html"></template>

<script>
import mixin from './mixin'

export default {
  mixins: [mixin],
  methods: {
    updateView() {
      this.visible.trust_party = this.filter.guarantee
    }
  },
  data() {
    return {
      asset_type: '供应链类',
      visible: {
        // guarantee: false,
        // supply_link_company_type: false,
        trust_party: false
      },
      filter: {
        asset_amount: '',
        asset_life: '',
        supply_link_company_type: '',
        supply_link_company_can_auth: false,
        supply_link_company_can_assure: false,
        guarantee: false,
        trust_party: []
      },

      fields: [{
        name: '*融资规模',
        group: 'group1',
        key: 'asset_amount',
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
        key: 'asset_life',
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
        key: 'supply_link_company_type',
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
        key: 'supply_link_company_can_auth',
        type: 'switch',
        validate: {
          maxlength: 120
        }
      }, {
        name: '核心企业可以提供担保',
        group: 'group2',
        key: 'supply_link_company_can_assure',
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
        key: 'trust_party',
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
