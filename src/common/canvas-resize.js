/*
 *
 * canvasResize
 *
 * Version: 1.2.0
 * Date (d/m/y): 02/10/12
 * Update (d/m/y): 14/05/13
 * Original author: @gokercebeci
 * Licensed under the MIT license
 * - This plugin working with binaryajax.js and exif.js
 *   (It's under the MPL License http://www.nihilogic.dk/licenses/mpl-license.txt)
 * Demo: http://canvasResize.gokercebeci.com/
 *
 * - I fixed iOS6 Safari's image file rendering issue for large size image (over mega-pixel)
 *   using few functions from https://github.com/stomita/ios-imagefile-megapixel
 *   (detectSubsampling, )
 *   And fixed orientation issue by using https://github.com/jseidelin/exif-js
 *   Thanks, Shinichi Tomita and Jacob Seidelin
 *   @mark 改成es6 module形式
 */
let pluginName = 'canvasResize'

let methods = {
  newsize: function(w, h, W, H, C) {
    let c = C ? 'h' : ''
    if ((W && w > W) || (H && h > H)) {
      let r = w / h
      if ((r >= 1 || H === 0) && W && !C) {
        w = W
        h = (W / r) >> 0
      } else if (C && r <= (W / H)) {
        w = W
        h = (W / r) >> 0
        c = 'w'
      } else {
        w = (H * r) >> 0
        h = H
      }
    }
    return {
      'width': w,
      'height': h,
      'cropped': c
    }
  },
  dataURLtoBlob: function(data) {
    let mimeString = data.split(',')[0].split(':')[1].split('')[0]
    let byteString = atob(data.split(',')[1])
    let ab = new ArrayBuffer(byteString.length)
    let ia = new Uint8Array(ab)
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i)
    }
    let bb = (window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder)
    if (bb) {
      //    console.log('BlobBuilder')
      bb = new (window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder)()
      bb.append(ab)
      return bb.getBlob(mimeString)
    } else {
      //    console.log('Blob')
      bb = new Blob([ab], {
        'type': (mimeString)
      })
      return bb
    }
  },
  /**
   * Detect subsampling in loaded image.
   * In iOS, larger images than 2M pixels may be subsampled in rendering.
   */
  detectSubsampling: function(img) {
    let iw = img.width
    let ih = img.height
    if (iw * ih > 1048576) { // subsampling may happen over megapixel image
      let canvas = document.createElement('canvas')
      canvas.width = canvas.height = 1
      let ctx = canvas.getContext('2d')
      ctx.drawImage(img, -iw + 1, 0)
        // subsampled image becomes half smaller in rendering size.
        // check alpha channel value to confirm image is covering edge pixel or not.
        // if alpha value is 0 image is not covering, hence subsampled.
      return ctx.getImageData(0, 0, 1, 1).data[3] === 0
    } else {
      return false
    }
  },
  /**
   * Update the orientation according to the specified rotation angle
   */
  rotate: function(orientation, angle) {
    let o = {
      // nothing
      1: {
        90: 6,
        180: 3,
        270: 8
      },
      // horizontal flip
      2: {
        90: 7,
        180: 4,
        270: 5
      },
      // 180 rotate left
      3: {
        90: 8,
        180: 1,
        270: 6
      },
      // vertical flip
      4: {
        90: 5,
        180: 2,
        270: 7
      },
      // vertical flip + 90 rotate right
      5: {
        90: 2,
        180: 7,
        270: 4
      },
      // 90 rotate right
      6: {
        90: 3,
        180: 8,
        270: 1
      },
      // horizontal flip + 90 rotate right
      7: {
        90: 4,
        180: 5,
        270: 2
      },
      // 90 rotate left
      8: {
        90: 1,
        180: 6,
        270: 3
      }
    }
    return o[orientation][angle] ? o[orientation][angle] : orientation
  },
  /**
   * Transform canvas coordination according to specified frame size and orientation
   * Orientation value is from EXIF tag
   */
  transformCoordinate: function(canvas, width, height, orientation) {
    switch (orientation) {
      case 5:
      case 6:
      case 7:
      case 8:
        canvas.width = height
        canvas.height = width
        break
      default:
        canvas.width = width
        canvas.height = height
    }
    let ctx = canvas.getContext('2d')
    switch (orientation) {
      case 1:
        // nothing
        break
      case 2:
        // horizontal flip
        ctx.translate(width, 0)
        ctx.scale(-1, 1)
        break
      case 3:
        // 180 rotate left
        ctx.translate(width, height)
        ctx.rotate(Math.PI)
        break
      case 4:
        // vertical flip
        ctx.translate(0, height)
        ctx.scale(1, -1)
        break
      case 5:
        // vertical flip + 90 rotate right
        ctx.rotate(0.5 * Math.PI)
        ctx.scale(1, -1)
        break
      case 6:
        // 90 rotate right
        ctx.rotate(0.5 * Math.PI)
        ctx.translate(0, -height)
        break
      case 7:
        // horizontal flip + 90 rotate right
        ctx.rotate(0.5 * Math.PI)
        ctx.translate(width, -height)
        ctx.scale(-1, 1)
        break
      case 8:
        // 90 rotate left
        ctx.rotate(-0.5 * Math.PI)
        ctx.translate(-width, 0)
        break
      default:
        break
    }
  },
  /**
   * Detecting vertical squash in loaded image.
   * Fixes a bug which squash image vertically while drawing into canvas for some images.
   */
  detectVerticalSquash: function(img, iw, ih) {
    let canvas = document.createElement('canvas')
    canvas.width = 1
    canvas.height = ih
    let ctx = canvas.getContext('2d')
    ctx.drawImage(img, 0, 0)
    let data = ctx.getImageData(0, 0, 1, ih).data
      // search image edge pixel position in case it is squashed vertically.
    let sy = 0
    let ey = ih
    let py = ih
    while (py > sy) {
      let alpha = data[(py - 1) * 4 + 3]
      if (alpha === 0) {
        ey = py
      } else {
        sy = py
      }
      py = (ey + sy) >> 1
    }
    let ratio = py / ih
    return ratio === 0 ? 1 : ratio
  },
  callback: function(d) {
    return d
  },
  extend: function() {
    let target = arguments[0] || {}
    let a = 1
    let al = arguments.length
    let deep = false
    if (target.constructor === Boolean) {
      deep = target
      target = arguments[1] || {}
    }
    if (al === 1) {
      target = this
      a = 0
    }
    let prop
    for (; a < al; a++) {
      if ((prop = arguments[a]) !== null) {
        for (let i in prop) {
          if (target === prop[i]) {
            continue
          }

          if (deep && typeof prop[i] === 'object' && target[i]) {
            methods.extend(target[i], prop[i])
          } else if (prop[i] !== undefined) {
            target[i] = prop[i]
          }
        }
      }
    }
    return target
  }
}

let defaults = {
  width: 300,
  height: 0,
  crop: false,
  quality: 80,
  rotate: 0,
  'callback': methods.callback
}

let Plugin = function(file, options) {
  this.file = file
    // EXTEND
  this.options = methods.extend({}, defaults, options)
  this._defaults = defaults
  this._name = pluginName
  this.init()
}

Plugin.prototype = {
  init: function() {
    //this.options.init(this)
    let $this = this
    let file = this.file

    let reader = new FileReader()
    reader.onloadend = function(e) {
      let dataURL = e.target.result
      let byteString = atob(dataURL.split(',')[1])
      let binary = new window.BinaryFile(byteString, 0, byteString.length)
      let exif = EXIF.readFromBinaryFile(binary)

      let img = new Image()
      img.onload = function(e) {
        let orientation = exif['Orientation'] || 1
        orientation = methods.rotate(orientation, $this.options.rotate)

        // CW or CCW ? replace width and height
        let size = (orientation >= 5 && orientation <= 8) ? methods.newsize(img.height, img.width, $this.options.width, $this.options.height, $this.options.crop) : methods.newsize(img.width, img.height, $this.options.width, $this.options.height, $this.options.crop)

        let iw = img.width
        let ih = img.height
        let width = size.width
        let height = size.height

        let canvas = document.createElement('canvas')
        let ctx = canvas.getContext('2d')
        ctx.save()
        methods.transformCoordinate(canvas, width, height, orientation)

        // over image size
        if (methods.detectSubsampling(img)) {
          iw /= 2
          ih /= 2
        }
        let d = 1024 // size of tiling canvas
        let tmpCanvas = document.createElement('canvas')
        tmpCanvas.width = tmpCanvas.height = d
        let tmpCtx = tmpCanvas.getContext('2d')
        let vertSquashRatio = methods.detectVerticalSquash(img, iw, ih)
        let sy = 0
        while (sy < ih) {
          let sh = sy + d > ih ? ih - sy : d
          let sx = 0
          while (sx < iw) {
            let sw = sx + d > iw ? iw - sx : d
            tmpCtx.clearRect(0, 0, d, d)
            tmpCtx.drawImage(img, -sx, -sy)
            let dx = Math.floor(sx * width / iw)
            let dw = Math.ceil(sw * width / iw)
            let dy = Math.floor(sy * height / ih / vertSquashRatio)
            let dh = Math.ceil(sh * height / ih / vertSquashRatio)
            ctx.drawImage(tmpCanvas, 0, 0, sw, sh, dx, dy, dw, dh)
            sx += d
          }
          sy += d
        }
        ctx.restore()
        tmpCanvas = tmpCtx = null

        // if rotated width and height data replacing issue
        let newcanvas = document.createElement('canvas')
        newcanvas.width = size.cropped === 'h' ? height : width
        newcanvas.height = size.cropped === 'w' ? width : height
        let x = size.cropped === 'h' ? (height - width) * 0.5 : 0
        let y = size.cropped === 'w' ? (width - height) * 0.5 : 0
        let newctx = newcanvas.getContext('2d')
        newctx.drawImage(canvas, x, y, width, height)
        let data

        console.log(file, file.type)
        if (file.type === 'image/png') {
          data = newcanvas.toDataURL(file.type)
        } else {
          data = newcanvas.toDataURL('image/jpeg', ($this.options.quality * 0.01))
        }

        // CALLBACK
        $this.options.callback(data, newcanvas.width, newcanvas.height)

        // })
      }
      img.src = dataURL
        // =====================================================
    }
    reader.readAsDataURL(file)
      //reader.readAsBinaryString(file)
  }
}

export default function(file, options) {
  if (typeof file === 'string') {
    return methods[file](options)
  } else {
    return new Plugin(file, options)
  }
}
