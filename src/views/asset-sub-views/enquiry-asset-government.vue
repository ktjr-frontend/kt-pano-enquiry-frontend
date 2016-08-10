<template src="./template.html"></template>

<script>
import mixin from './mixin'

export default {
  mixins: [mixin],
  methods: {
    updateView() {
      // this.visible.developer_type = this.filter.rank === 'no_rank'
      // this.visible.guarantee = this.filter.rank === '50top'
      this.visible.trust_party = this.filter.guarantee
    }
  },
  data() {
    let lastSaved = JSON.parse(window.sessionStorage.enquiryFilterGovernmentCache || '{}')

    setTimeout(() => {
      this.updateView()
    }, 10)

    return {
      asset_type: '政信类',
      visible: {
        trust_party: false
      },
      filter: Object.assign({
        asset_amount: '',
        asset_life: '',
        gov_trusty_level: '',
        gov_trusty_income: '',
        gov_trusty_letter: '',
        guarantee: false,
        trust_party: []
      }, lastSaved),

      fields: [{
        name: '*融资规模',
        group: 'group1',
        key: 'asset_amount',
        type: 'input',
        subType: 'number',
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
        subType: 'number',
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
        key: 'gov_trusty_level',
        type: 'select',
        tip: '国家发改委、证监会或人民银行认可的评级机构评级',
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
          key: 'no_grade',
          value: '无评级'
        }]
      }, {
        name: '地方财政公共预算收入',
        group: 'group2',
        key: 'gov_trusty_income',
        type: 'select',
        tip: '公共财政预算收入是指政府凭借国家政治权力，以社会管理者身份筹集以税收为主体的财政收入。',
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
        key: 'gov_trusty_letter',
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
          value: '其他政府平台'
        }, {
          key: 'other',
          value: '其它'
        }]
      }]

    }
  }
}
</script>
