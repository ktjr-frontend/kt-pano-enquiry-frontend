export default {
  install(Vue, options) {
    // 添加类
    Vue.directive('kt-toggle-onfucusblur', {
      params: ['toggleClass', 'child'],
      bind() {
        let input = this.el.querySelector(this.params.child)
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
        let displayBox = this.el.querySelector(this.params.displayInto)
        displayBox.innerText = value.length + '/' + this.params.maxLength
        displayBox.classList.toggle('warning', value.length > this.params.maxLength)
      }
    })
  }
}
