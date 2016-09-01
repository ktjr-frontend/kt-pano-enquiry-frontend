<template src="../_parts/cell-form-template.jade" lang="jade"></template>

<script>
import mixin from './mixin'
import commonFilter from './common-filter'
import _ from 'lodash'

export default {
  mixins: [mixin],
  methods: {
    updateView() {
      this.visible.developer_type = this.filter.developer_order === '无排名'
      this.visible.trust_party = this.filter.has_trust_party
      this.visible.rating_level = this.filter.developer_type !== '' && this.filter.developer_type !== '上市公司'
    }
  },
  data() {
    let lastSaved = JSON.parse(window.sessionStorage.enquiryFilterEslateCache || '{}')

    setTimeout(() => {
      this.updateView()
    }, 10)

    return {
      visible: {
        developer_type: false,
        rating_level: false,
        trust_party: false
      },

      filter: Object.assign({
        asset_type: '房地产类',
        content: 'search',
        asset_amount: '',
        asset_life: '',
        developer_order: '',
        developer_type: '',
        rating_level: '',
        has_trust_party: false,
        trust_party: []
      }, lastSaved),

      fields: _.concat(commonFilter, [{
        name: '*开发商全国排名',
        group: 'group2',
        key: 'developer_order',
        type: 'select',
        validate: {
          maxlength: 120, // hack invalid validate
          required: {
            rule: true,
            message: '请选择开发商全国排名'
          }
        },
        options: [{
          key: '50top',
          value: '前50强'
        }, {
          key: 'no_rank',
          value: '无排名'
        }]
      }, {
        name: '*开发商类型',
        group: 'group2',
        key: 'developer_type',
        type: 'select',
        validate: {
          maxlength: 120,
          required: {
            rule: true,
            message: '请选择开发商类型'
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
        name: '*评级情况',
        group: 'group2',
        key: 'rating_level',
        type: 'select',
        validate: {
          maxlength: 120,
          required: {
            rule: true,
            message: '请选择评级情况'
          }
        },
        options: [{
          key: '0',
          value: 'AA及以上'
        }, {
          key: '1',
          value: 'AA以下'
        }, {
          key: '2',
          value: '无'
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
