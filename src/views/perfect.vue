<template>
  <div class="form-container">
    <validator name="cardValidation">
      <form name="cardForm" novalidate @submit="onSubmit($event)">
        <div class="form-group card-container" :class="containerClass">

          <!-- <label class="form-control-label">上传名片</label> -->
          <div class="card-body">
            <div class="btn-file">
              <input v-model="card.file" @change="cardOnChange('file', $event)" type="file" v-validate:file="{required: true}" name="file" id="file">
            </div>
            <div class="business-card-preview">
              <img alt="名片预览" :src="card.previewUrl">
            </div>
          </div>
        </div>

        <div class="form-group">
          <flexbox>
            <flexbox-item>
              <button class="btn" @click="$parent.log({name: '完成'})">完成</button>
            </flexbox-item>
            <flexbox-item>
              <button class="btn btn-gray" @click.prevent="resetForm()">重新上传</button>
            </flexbox-item>
          </flexbox>
        </div>

      </form>
    </validator>
  </div>

</template>

<script>
import Alert from 'vux-components/alert'
import Flexbox from 'vux-components/flexbox'
import FlexboxItem from 'vux-components/flexbox-item'
import Toast from 'vux-components/toast'

import {
  user
} from '../vuex/getters'
import {
  cards
} from '../common/resources'

export default {
  components: {
    Alert,
    Flexbox,
    FlexboxItem,
    Toast
  },
  vuex: {
    getters: {
      user
    }
  },
  data() {
    return {

      card: {
        file: null,
        previewUrl: '',
        previewing: false,
        // containerClass: '',
        uploading: false
      }
    }
  },
  computed: {
    containerClass: {
      cached: false,
      get() {
        let cssClass = ''
        switch (true) {
          case this.card.previewing:
            cssClass = 'preparing'
            break
          case !!this.card.previewUrl:
            cssClass = 'preview'
            break
          case this.card.uploading:
            cssClass = 'pending'
            break
          default:
            cssClass = ''
        }
        return cssClass
      }
    }
  },
  methods: {
    showPreview(url) {
      this.card.previewUrl = url
      this.card.previewing = false
    },
    cardOnChange(name, event) {
      this.validate(name)
      let file = event.target
      let reader = new FileReader()
      reader.addEventListener('load', () => {
        this.$parent.hideLoadingStatus()
        this.showPreview(reader.result)
        this.$parent.log({
          name: '上传名片'
        })
      })

      if (file.files[0]) {
        this.$parent.showLoadingStatus()
        this.previewing = true
        setTimeout(function() {
          reader.readAsDataURL(file.files[0])
        }, 50)
      }
    },
    resetForm() {
      this.card.previewUrl = ''
      document.forms.namedItem('cardForm').reset()
      this.$parent.log({
        name: '重新上传'
      })
    },
    validate: function(name) {
      if (this.$cardValidation[name].invalid && this.$cardValidation[name].touched) {
        this.$validate(name)
      }
    },
    onSubmit(event) {
      event.preventDefault()
      this.$validate(true, () => {
        if (this.$cardValidation.invalid) {
          this.$parent.showToast({
            text: '内容有误'
          })
        } else {
          this.$parent.showLoadingStatus()
          let form = document.forms.namedItem('cardForm')
          let fromData = new FormData(form)

          cards.save(fromData).then((res) => {
            cards.update({
              content: 'confirm'
            }, {}).then((res) => {
              this.$parent.hideLoadingStatus()
              this.$parent.showAlert({
                content: '名片上传图成功'
              })
              this.$parent.updateUser(Object.assign({}, this.user, res.json().account))
              this.$router.go({
                name: 'enquiry'
              })
            }, (res) => {
              this.$parent.hideLoadingStatus()
              this.$parent.showToast({
                text: res.json().error || '保存失败'
              })
            })
          }, (res) => {
            this.$parent.hideLoadingStatus()
            this.$parent.showToast({
              text: res.json().error || '保存失败'
            })
          })
        }
      })

      // var xhr = new XMLHttpRequest()

      // // 确认完成
      // var fromData = new FormData(form)
      // xhr.open('POST', '/api/v1/cards', true)
      //   // xhr.setRequestHeader('Authorization', token)
      // xhr.onload = (oev) => {
      //   var data = JSON.parse(oev.currentTarget.responseText)
      //   if (xhr.status === 201) {
      //     this.alert.uploadSuccess = true
      //   } else {
      //     this.toast.text = ''
      //     this.toast.type = 'error'
      //   }
      // }

      // this.disabled = true
      // this.innerHTML = '上传中<i class="dotting"></i>'
      // this.classList.add('pending')
      // xhr.send(oData)
    }
  }
}
</script>

<style lang="scss" scoped>
.card-container {
  $dotSize: 0.040258rem;
  text-align: center;
  .dotting {
    display: inline-block;
    min-width: $dotSize;
    min-height: $dotSize;
    margin-right: 0.064412rem;
  }
  .title {
    font-size: 0.523349rem;
    margin: 0.805153rem auto;
  }
  .card-body {
    margin: 0 auto;
    .business-card-preview {
      height: 4.025765rem;
      margin: 0 auto;
      border: 1px solid #dbe0e7;
      position: relative;
      img {
        max-width: 98%;
        max-height: 98%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
      }
    }
    .btn-file {
      height: 3.623188rem;
      width: 3.623188rem;
      line-height: 3.623188rem;
      margin: 0 auto;
      position: relative;
      background: #dbe0e7;
      border-radius: 0.080515rem;
      text-align: center;
      font-size: 300px;
      color: white;
      overflow: hidden;
      &:after {
        height: 1.851852rem;
        width: 0.177134rem;
      }
      &:before {
        width: 1.851852rem;
        height: 0.177134rem;
      }
      &:after,
      &:before {
        content: '';
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translateX(-50%) translateY(-50%);
        background: white;
        border-radius: 0.080515rem;
        pointer-events: none;
      }
      &:active {
        &:before,
        &:after {
          background: #4380dd;
        }
      }
      input {
        position: absolute;
        opacity: 0;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        width: 100%;
        height: 100%;
      }
      span {}
    }
    .business-card-preview {
      display: none;
    }
    .form-footer {
      display: none;
    }
    .buttons {
      margin-top: 1.207729rem;
    }
    /* .btn {
      height: 0.764895rem;
      width: 3.381643rem;
      font-size: 0.442834rem;
      color: white;
      border: 0;
      border-radius: 0.080515rem;
      &.btn-submit {
        background: #626b81;
        &:active {
          background: darken(#626b81, 10%);
        }
        margin-right: 10px;
      }
      &.btn-redo {
        width: 2.713366rem;
        background: #82899c;
        &:active {
          background: darken(#82899c, 10%);
        }
      }
      &.pending {
        .dotting {
          animation: dot 2s infinite step-start both;
        }
      }
    } */
  }
  &.preparing {
    .card-body {
      .status {
        display: block;
      }
    }
  }
  &.preview {
    .card-body {
      .business-card-preview,
      .form-footer {
        display: block;
      }
      .btn-file {
        display: none;
      }
    }
  }
  &.done {
    .title {
      display: none;
    }
    .card-body {
      .business-card-preview,
      .form-footer,
      .btn-file {
        display: none;
      }
    }
    .success {
      display: block;
    }
  }
}
</style>
