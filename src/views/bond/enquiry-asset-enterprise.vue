<template src="../_parts/cell-form-template.html"></template>

<script>
import mixin from './mixin'
import commonFilter from './common-filter'
import _ from 'lodash'

export default {
  mixins: [mixin],
  methods: {
    updateView() {
      this.visible.company_borrow_shareholder_type = !this.filter.company_borrow_on_market
      this.visible.trust_party = this.filter.has_trust_party
    }
  },
  data() {
    let lastSaved = JSON.parse(window.sessionStorage.enquiryFilterEnterpriseCache || '{}')

    setTimeout(() => {
      this.updateView()
    }, 10)

    return {
      visible: {
        company_borrow_shareholder_type: false,
        trust_party: false
      },
      filter: Object.assign({
        asset_type: '企业借款类',
        content: 'search',
        asset_amount: '',
        company_borrow_shareholder_type: '',
        company_borrow_on_market: true,
        asset_life: '',
        has_trust_party: false,
        trust_party: []
      }, lastSaved),

      fields: _.concat(commonFilter, [{
        name: '融资主体为上市公司',
        group: 'group2',
        key: 'company_borrow_on_market',
        type: 'switch',
        validate: {
          maxlength: 120
        }
      }, {
        name: '*股东类型',
        group: 'group2',
        key: 'company_borrow_shareholder_type',
        type: 'select',
        validate: {
          maxlength: 120,
          required: {
            rule: true,
            message: '请选择股东类型'
          }
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
          value: '其它'
        }]
      }, {
        name: '担保措施',
        group: 'group3',
        key: 'has_trust_party',
        type: 'switch',
        validate: {
          maxlength: 120
        }
      }, {
        name: '*担保主体',
        group: 'group3',
        key: 'trust_party',
        type: 'checkboxs',
        validate: {
          required: {
            rule: true,
            message: '请选择担保主体'
          }
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
          value: '其它'
        }]
      }])
    }
  }
}
</script>
