var path = require('path')
var config = require('../config')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

exports.assetsPath = function(_path) {
  return path.posix.join(config.build.assetsSubDirectory, _path)
}

exports.cssLoaders = function(options) {
  options = options || {}
    // generate loader string to be used with extract text plugin
  function generateLoaders(loaders) {
    var sourceLoader = loaders.map(function(loader) {
      var extraParamChar
      if (/\?/.test(loader)) {
        loader = loader.replace(/\?/, '-loader?')
        extraParamChar = '&'
      } else {
        loader = loader + '-loader'
        extraParamChar = '?'
        if (loader === 'css-loader') {
          extraParamChar = '?-autoprefixer&'
        }
      }
      return loader + (options.sourceMap ? extraParamChar + 'sourceMap' : '')
    }).join('!')

    if (options.extract) {
      return ExtractTextPlugin.extract('vue-style-loader', sourceLoader)
    } else {
      return ['vue-style-loader', sourceLoader].join('!')
    }
  }

  // http://vuejs.github.io/vue-loader/configurations/extract-css.html
  return {
    css: generateLoaders(['css']),
    postcss: generateLoaders(['css']),
    less: generateLoaders(['css', 'less']),
    sass: generateLoaders(['css', 'sass?indentedSyntax']),
    scss: generateLoaders(['css', 'sass']),
    stylus: generateLoaders(['css', 'stylus']),
    styl: generateLoaders(['css', 'stylus'])
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function(options) {
  var output = []
  var loaders = exports.cssLoaders(options)
  for (var extension in loaders) {
    // var loader = loaders[extension]
    var loader = loaders[extension].split('!')
    var isPreProcesser = ['less', 'sass', 'scss', 'stylus', 'styl'].some(function(v) {
      return v === extension
    })

    if (isPreProcesser) {
      loader.splice(-1, 0, 'postcss-loader') // 之前是loader.splice(3, 0, 'postcss') 有错误，应该在sass loader 后,导致karma运行失败 嚓
    }

    output.push({
      test: new RegExp('\\.' + extension + '$'),
      loader: loader.join('!')
    })
  }
  return output
}
