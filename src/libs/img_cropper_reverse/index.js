import Hammer from 'hammerjs'

/*
 * @author luxueyan
 * @desc 与img_cropper不同 通过放大缩小图片来实现切图
 */
export default class ImgCropper {
  container = null // img父元素
  mc = null // hammer的mc实例
  cropperNode = null // 中间的切图区域
  cropperNodeHeight = 100
  cropperNodeWidth = 100
  imageNode = null // image dom
  imageUrl = ''

  adjustScale = 1
  adjustDeltaX = 0
  adjustDeltaY = 0

  currentScale = null
  currentDeltaX = null
  currentDeltaY = null

  constructor(options = {}) {
    Object.assign(this, options)
    this._init()
  }

  _init() {
    this.container.classList.add('img-cropper-reverse')
    let mc = this.mc = new Hammer.Manager(this.container)
    let pinch = new Hammer.Pinch()
    let pan = new Hammer.Pan()

    this._addCropperView()
    this.imageUrl && this.setImage(this.imageUrl)

    pinch.recognizeWith(pan)

    mc.add([pinch, pan])

    mc.on('pinch pan', ev => {
      let transforms = []

      // Adjusting the current pinch/pan event properties using the previous ones set when they finished touching
      this.currentScale = this.adjustScale * ev.scale
      this.currentDeltaX = this.adjustDeltaX + (ev.deltaX / this.currentScale)
      this.currentDeltaY = this.adjustDeltaY + (ev.deltaY / this.currentScale)

      // Concatinating and applying parameters.
      transforms.push(`scale(${this.currentScale})`)
      transforms.push(`translate(${this.currentDeltaX}px,${this.currentDeltaY}px)`)
      this.imageNode.style.webkitTransform = this.imageNode.style.transform = transforms.join(' ')
    })

    mc.on('panend pinchend', ev => {
      // Saving the final transforms for adjustment next time the user interacts.
      this.adjustScale = this.currentScale
      this.adjustDeltaX = this.currentDeltaX
      this.adjustDeltaY = this.currentDeltaY
    })
  }

  // 截图区域
  _addCropperView() {
    let cropperNode = this.cropperNode = document.createElement('div')
    cropperNode.style.height = `${this.cropperNodeHeight}px`
    cropperNode.style.width = `${this.cropperNodeWidth}px`
    cropperNode.classList.add('cropper-view')
    this.container.appendChild(cropperNode)
  }

  // 设置图片
  setImage(url) {
    this.imageUrl = url

    if (!this.imageNode) {
      let img = this.imageNode = document.createElement('img')
      this.container.appendChild(img)

      img.onload = function() {
        let winW = window.innerWidth
        let winH = window.innerHeight
        let imgW = this.naturalWidth
        let imgH = this.naturalHeight

        // 保证预览的图片不超出屏幕
        if (winW / winH > imgW / imgH) {
          this.style.height = (winH - 100) + 'px'
        } else {
          this.style.width = (winW - 50) + 'px'
        }
      }
    }

    this.imageNode.src = url
    this._resetScale()
  }

  _resetScale() {
    this.adjustScale = 1
    this.adjustDeltaX = 0
    this.adjustDeltaY = 0

    this.currentScale = null
    this.currentDeltaX = null
    this.currentDeltaY = null

    this.imageNode.style.webkitTransform = this.imageNode.style.transform = 'none'
  }

  getInfo() {
    let imgRect = this.imageNode.getBoundingClientRect()
    let cropRect = this.cropperNode.getBoundingClientRect()

    return {
      l: cropRect.left - imgRect.left, // 取相对唯一
      t: cropRect.top - imgRect.top,
      cw: imgRect.width, //  为了兼容 img_cropper的cw（容器宽度）,这里指的放大缩小后的宽度
      ch: imgRect.height, //  为了兼容 img_cropper的cw（容器宽度）
      w: this.cropperNodeWidth, // cropper 的默认高度
      h: this.cropperNodeHeight // cropper 的默认宽度
    }
  }
}
