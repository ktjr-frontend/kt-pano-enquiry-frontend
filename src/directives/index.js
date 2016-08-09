export default {
  install(Vue, options) {
    // 添加类
    Vue.directive('kt-toggle-onfucusblur', {
      params: ['toggleClass', 'child'],
      bind() {
        this.el.querySelector(this.params.child).addEventListener('focus', () => {
          this.el.classList.add(this.params.toggleClass)
        })
        this.el.querySelector(this.params.child).addEventListener('blur', () => {
          this.el.classList.remove(this.params.toggleClass)
        })
      }
    })
  }
}
