<template src="./template.html"></template>

<script>
import mixin from './mixin'

export default {
  mixins: [mixin],
  methods: {
    updateView() {
      this.visible.financing_grade = this.filter.developer_type !== 'other'
        // this.visible.developer_type = this.filter.rank === 'no_rank'
        // this.visible.guarantee = this.filter.rank === '50top'
        // this.visible.guarantee_subject = this.filter.guarantee
    }
  },
  data() {
    return {
      type: 'mini_finance',
      visible: {
        financing_grade: true
          // guarantee: false,
          // developer_type: false,
          // guarantee_subject: false
      },
      filter: {
        amount: '',
        duration: '',
        rank: '',
        developer_type: '',
        financing_grade: '',
        company_age: '',
        asset_type: '',
        overdue_rate: ''
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
        name: '股东类型',
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
        name: '融资经历',
        group: 'group2',
        key: 'financing_grade',
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
        key: 'company_age',
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
        key: 'asset_type',
        type: 'select',
        validate: {
          required: true
        },
        options: [{
          key: '0',
          value: '房抵押借款'
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
          value: '其他'
        }]
      }, {
        name: '时点不良率',
        tip: '不良贷款率指贷款中不良贷款的占比，是一个时点指标，不良率=不良贷款余额/总贷款余额',
        group: 'group2',
        key: 'overdue_rate',
        type: 'input',
        validate: {
          // required: true,
          pattern: {
            rule: '/^(|\\d+(\\.\\d+)?)$/',
            message: '请填写数字'
          }
        },
        unit: '%'
      }]

    }
  }
}
</script>
