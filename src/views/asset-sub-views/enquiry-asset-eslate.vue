<template src="./template.html"></template>

<script>
import mixin from './mixin'

export default {
  mixins: [mixin],
  methods: {
    updateView() {
      this.visible.developer_type = this.filter.rank === 'no_rank'
      this.visible.guarantee = this.filter.rank === '50top'
      this.visible.guarantee_subject = this.filter.guarantee
    }
  },
  data() {
    return {
      visible: {
        guarantee: false,
        developer_type: false,
        guarantee_subject: false
      },
      filter: {
        amount: '',
        duration: '',
        rank: '',
        developer_type: '',
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
        name: '开发商全国排名',
        group: 'group2',
        key: 'rank',
        type: 'select',
        validate: {
          maxlength: 120
        },
        options: [{
          key: '50top',
          value: '前50强'
        }, {
          key: 'no_rank',
          value: '无排名'
        }]
      }, {
        name: '开发商类型',
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
        name: '第三方担保',
        group: 'group3',
        key: 'guarantee',
        type: 'switch'
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
