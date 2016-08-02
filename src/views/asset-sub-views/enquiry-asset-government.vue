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
      visible: {
        guarantee_subject: false
      },
      filter: {
        amount: '',
        duration: '',
        finance_rank: '',
        local_finance_budget: '',
        finance_letters: '',
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
        name: '融资主体评级',
        group: 'group2',
        key: 'finance_rank',
        type: 'select',
        tip: '待定',
        validate: {
          maxlength: 120
        },
        options: [{
          key: 'AAA',
          value: 'AAA'
        }, {
          key: 'AA+',
          value: 'AA+'
        }, {
          key: 'AA',
          value: 'AA'
        }, {
          key: 'AA-',
          value: 'AA-'
        }, {
          key: '无评级',
          value: 'no_grade'
        }]
      }, {
        name: '地方财政公共预算收入',
        group: 'group2',
        key: 'local_finance_budget',
        type: 'select',
        tip: '待定',
        validate: {
          maxlength: 120
        },
        options: [{
          key: '<30',
          value: '30亿以下'
        }, {
          key: '31-50',
          value: '31-50亿'
        }, {
          key: '>51',
          value: '50亿以上'
        }]
      }, {
        name: '可提供财政兜底函',
        group: 'group2',
        key: 'finance_letters',
        type: 'switch',
        validate: {
          maxlength: 120
        }
      }, {
        name: '有第三方担保',
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
