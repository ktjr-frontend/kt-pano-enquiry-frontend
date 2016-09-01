<template src="../_parts/cell-form-template.jade" lang="jade"></template>

<script>
import mixin from '../bond/mixin'
// import _ from 'lodash'

export default {
  mixins: [mixin],
  /*created() {
    let opt = _.cloneDeep(this.selectInputSeed)
    opt.id = _.uniqueId()
    this.selectInputField.combineList.push(opt)
  },*/
  methods: {
    updateView() {
      // empty
    }
    /*onSubmit() {
      this.$validate(true, () => {
        if (this.$validation.invalid) {
          this.showFirstError()
        } else {
          this.cacheFilter()

          // _.chain(this.filter).map((v, k) => {
          //   if (k.indexOf('si_') > -1) {
          //     this.fitler[]
          //   }
          // })

          this.$router.go({
            name: 'enquiryResult',
            query: {
              ...this.filter,
              asset_type: this.asset_type
            }
          })
        }
      })
    },
    addSelectInputFilter() {
      if (this.selectInputField.combineList.length >= this.assetLifeList.length) {
        this.$root.showToast('亲，不能再添加了')
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
    }*/
  },

  data() {
    let lastSaved = JSON.parse(window.sessionStorage.enquiryFilterAssetManageCache || '{}')

    setTimeout(() => {
      this.updateView()
    }, 10)

    return {
      subTitle: '请尽可能准确地填写以下产品相关信息，以便为您推荐最适合的利率和发行平台：',
      visible: {},
      /*selectInputSeed: {
        options: [{
          name: '*期限',
          type: 'select'
        }, {
          name: '*利率',
          type: 'input',
          unit: '%',
          placeholder: '请填写利率'
        }]
      },*/
      filter: Object.assign({
        content: 'search_am',
        asset_type: '资管类',
        // inquiry_type: '资管类',
        credit_manager_type: '金融机构主动管理',
        product_invest: '',
        asset_amount: '',
        asset_life: []
      }, lastSaved),
      /*assetLifeList: [{
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
      }],*/
      fields: [{
        name: '*管理人类型',
        group: 'group1',
        key: 'credit_manager_type',
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
          tip: '实际管理人为信托公司、保险公司、证券公司、期货公司、银行等金融机构'
        }, {
          key: '1',
          value: '非金融机构类资产管理机构管理',
          tip: '实际管理人为私募基金管理人、投资管理/咨询公司等非金融机构'
        }]
      }, {
        name: '*产品投向',
        group: 'group2',
        key: 'product_invest',
        type: 'select',
        validate: {
          required: {
            rule: true,
            message: '请选择产品投向'
          }
        },
        options: [{
          key: '1',
          value: '纯债券'
        }, {
          key: '2',
          value: '股债混合'
        }, {
          key: '3',
          value: '非标债权'
        }, {
          key: 'other',
          value: '其它'
        }]
      }, {
        name: '*产品存量规模',
        group: 'group3',
        key: 'asset_amount',
        type: 'input',
        subType: 'number',
        format: 'wy',
        placeholder: '不少于100万元',
        validate: {
          min: {
            rule: 100,
            message: '产品存量规模不少于100万元'
          },
          pattern: {
            rule: '/^\\d+?$/',
            message: '请正确填写产品存量规模'
          }
        },
        unit: '万元'
      }, {
        name: '*期限',
        title: '请选择您关注的期限，以便为您推荐最适合的平台（可多选）：',
        group: 'group4',
        key: 'asset_life',
        type: 'checkboxs',
        hasCheckAll: true,
        validate: {
          required: {
            rule: true,
            message: '请选择期限'
          }
        },
        options: [{
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
        }]
      }]

      /*selectInputField: { //单独从fields提取出来处理
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
      }*/
    }
  }
}
</script>

<style lang="scss">
/* .select-input-section {
  .weui_select {
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
} */
</style>
