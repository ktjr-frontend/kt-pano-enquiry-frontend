<template src="./template.html"></template>

<script>
import mixin from './mixin'
import commonFilter from './common-filter'
import _ from 'lodash'

export default {
  mixins: [mixin],
  methods: {
    updateView() {
      this.visible.small_loan_fin_exp = this.filter.small_loan_shareholder_type === '其它'
    }
  },
  data() {
    let lastSaved = JSON.parse(window.sessionStorage.enquiryFilterMiniFinanceCache || '{}')

    setTimeout(() => {
      this.updateView()
    }, 10)

    return {
      visible: {
        small_loan_fin_exp: false
          // guarantee: false,
          // small_loan_shareholder_type: false,
          // guarantee_subject: false
      },
      filter: Object.assign({
        asset_type: '小微金融类',
        content: 'search',
        asset_amount: '',
        asset_life: '',
        small_loan_shareholder_type: '',
        small_loan_fin_exp: '',
        small_loan_company_age: '',
        small_loan_asset_type: '',
        small_loan_bad_rate: ''
      }, lastSaved),
      fields: _.concat(commonFilter, [{
        name: '股东类型',
        group: 'group2',
        key: 'small_loan_shareholder_type',
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
          value: '其它'
        }]
      }, {
        name: '融资经历',
        group: 'group2',
        key: 'small_loan_fin_exp',
        type: 'select',
        validate: {
          maxlength: 120
        },
        options: [{
          key: 'A',
          value: 'A轮'
        }, {
          key: 'B',
          value: 'B轮'
        }, {
          key: 'C+',
          value: 'C轮及以上'
        }]
      }, {
        name: '公司经营年限',
        group: 'group2',
        key: 'small_loan_company_age',
        type: 'select',
        validate: {
          maxlength: 120
        },
        options: [{
          key: '<1',
          value: '小于一年'
        }, {
          key: '>1',
          value: '超过一年'
        }]
      }, {
        name: '*资产种类',
        group: 'group2',
        key: 'small_loan_asset_type',
        type: 'select',
        validate: {
          required: {
            rule: true,
            message: '请选择资产种类'
          }
        },
        options: [{
          key: '0',
          value: '房屋抵押借款'
        }, {
          key: '1',
          value: '车辆融资'
        }, {
          key: '2',
          value: '消费分期资产'
        }, {
          key: '3',
          value: '线上现金贷'
        }, {
          key: '4',
          value: '线下现金贷'
        }, {
          key: '5',
          value: '其它'
        }]
      }, {
        name: '时点不良率',
        tip: '不良贷款率指贷款中不良贷款的占比，是一个时点指标，不良率=不良贷款余额/总贷款余额',
        group: 'group2',
        key: 'small_loan_bad_rate',
        type: 'input',
        validate: {
          // required: true,
          pattern: {
            rule: '/^(|\\d+(\\.\\d+)?)$/',
            message: '时点不良率请填写数字'
          },
          min: {
            rule: 0,
            message: '时点不良率不能小于0'
          },
          max: {
            rule: 100,
            message: '时点不良率不能大于100'
          }
        },
        unit: '%'
      }])
    }
  }
}
</script>
