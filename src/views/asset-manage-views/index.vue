<template src="../asset-sub-views/template.html"></template>

<script>
import mixin from '../asset-sub-views/mixin'
import _ from 'lodash'

export default {
  mixins: [mixin],
  created() {
    let opt = _.cloneDeep(this.selectInputSeed)
    opt.id = _.uniqueId()
    this.selectInputField.combineList.push(opt)
  },
  methods: {
    updateView() {
      // empty
    },
    onSubmit() {
      //todo
    },
    addSelectInputFilter() {
      if (this.selectInputField.combineList.length >= this.assetLifeList.length) {
        this.$parent.showToast('亲，不能再添加了')
        return
      }

      let opt = _.cloneDeep(this.selectInputSeed)
      opt.id = _.uniqueId()
      this.selectInputField.combineList.push(opt)
    },
    deleteSelectInputFilter(id) {
      let opt = this.selectInputField.combineList.find((v) => {
        return v.id === id
      })

      opt && this.selectInputField.combineList.$remove(opt)
    }
  },

  data() {
    let lastSaved = JSON.parse(window.sessionStorage.enquiryFilterSupplyChainCache || '{}')

    setTimeout(() => {
      this.updateView()
    }, 10)

    return {
      asset_type: '资管类',
      visible: {},
      selectInputSeed: {
        options: [{
          name: '*期限',
          type: 'select'
        }, {
          name: '*利率',
          type: 'input',
          unit: '%',
          placeholder: '请填写利率'
        }]
      },
      filter: Object.assign({
        custodian_type: '金融机构主动管理',
        product_invest: [],
        asset_amount: ''
      }, lastSaved),
      assetLifeList: [{
        key: 0,
        value: '1天'
      }, {
        key: 1,
        value: '1周'
      }, {
        key: 2,
        value: '15天'
      }, {
        key: 3,
        value: '1个月'
      }, {
        key: 4,
        value: '2个月'
      }, {
        key: 5,
        value: '3个月'
      }, {
        key: 6,
        value: '6个月'
      }, {
        key: 7,
        value: '12个月'
      }, {
        key: 8,
        value: '超过12个月'
      }],
      fields: [{
        name: '*管理人类型',
        group: 'group1',
        key: 'custodian_type',
        type: 'option',
        validate: {
          required: {
            rule: true,
            message: '请选择管理人类型'
          }
        },
        options: [{
          key: '0',
          value: '金融机构主动管理',
          tip: '提示待定'
        }, {
          key: '1',
          value: '其他资产管理机构',
          tip: '提示待定'
        }]
      }, {
        name: '产品投向',
        group: 'group2',
        key: 'product_invest',
        type: 'checkboxs',
        validate: {
          maxlength: 120
        },
        options: [{
          key: '0',
          value: '票据'
        }, {
          key: '1',
          value: '房地产债权'
        }, {
          key: '2',
          value: '上市公司债权'
        }, {
          key: '3',
          value: '保险资管'
        }, {
          key: '4',
          value: '信托'
        }, {
          key: '5',
          value: '银行理财'
        }, {
          key: 'other',
          value: '其它'
        }]
      }, {
        name: '产品存量规模',
        group: 'group3',
        key: 'asset_amount',
        type: 'input',
        subType: 'number',
        format: 'wy',
        placeholder: '不少于100万元',
        validate: {
          pattern: {
            rule: '/^\\d*?$/',
            message: '产品存量规模不能为空'
          }
        },
        unit: '万元'
      }],
      selectInputField: { //单独从fields提取出来处理
        name: '',
        group: 'group1',
        title: '请尽量给出较全的期限－收益率，以便为您展示对应的推荐利率',
        key: 'asset_amount',
        type: 'select-input',
        validate: {
          select: {
            required: {
              rule: true,
              message: '请选择期限'
            }
          },
          input: {
            required: {
              rule: true,
              message: '利率不能为空'
            },
            pattern: {
              rule: '/^(|\\d+(\\.\\d+)?)$/',
              message: '利率请填写数字'
            }
          }
        },
        combineList: []
      }
    }
  }
}
</script>

<style lang="scss">
.select-input-section {
  .weui_select{
    line-height: 2em;

    height: 2em;
    width: 100%;
  }
  .icon-delete,
  .icon-add {
    font-size: 0.322061rem; //40px
    color: #b5bbcb;
    &.disabled,
    &[disabled] {
      color: #e9ecf1;
      pointer-events: none;
      &:active {
        color: #e9ecf1;
      }
    }
    &:active {
      color: #194373;
    }
  }
  .add-select-input {
    &:active {
      .icon-add {
        color: #194373;
      }
    }
  }
  .bottom-buttons {
    padding: 0.402576rem 0.402576rem 0.161031rem; //40px 20px
    font-size: 0.322061rem; //40px
    // margin-top: 0.322061rem; //40px
    text-align: right;
  }
}
</style>
