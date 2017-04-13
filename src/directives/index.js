export default {
  install(Vue, options) {
    // 添加类
    Vue.directive('kt-toggle-onfucusblur', {
      params: ['toggleClass', 'child'],
      bind() {
        const input = this.el.querySelector(this.params.child)
        input && input.addEventListener('focus', () => {
          this.el.classList.add(this.params.toggleClass)
        })
        input && input.addEventListener('blur', () => {
          this.el.classList.remove(this.params.toggleClass)
        })
      }
    })

    // textarea字数显示
    Vue.directive('kt-textarea-count', {
      params: ['display-into', 'max-length'],
      update(value) {
        const displayBox = this.el.querySelector(this.params.displayInto)
        const filledLength = String(value || '').length
        displayBox.innerText = filledLength + '/' + this.params.maxLength
        displayBox.classList.toggle('warning', filledLength > this.params.maxLength)
      }
    })

    // 阻止默认行为
    Vue.directive('kt-prevent', {
      bind() {
        this.el.addEventListener('touchstart', e => {
          e.preventDefault()
        })
      }
    })
  }
}
