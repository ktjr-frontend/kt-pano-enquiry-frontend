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
  }
}
