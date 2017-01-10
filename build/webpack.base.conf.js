var path = require('path')
var config = require('../config')
var utils = require('./utils')
var projectRoot = path.resolve(__dirname, '../')

var env = process.env.NODE_ENV
  // check env & config/index.js to decide whether to enable CSS source maps for the
  // various preprocessor loaders added to vue-loader at the end of this file
var cssSourceMapDev = (env === 'development' && config.dev.cssSourceMap)
var cssSourceMapProd = (env === 'production' && config.build.productionSourceMap)
var useCssSourceMap = cssSourceMapDev || cssSourceMapProd

module.exports = {
  entry: {
    // babel-polyfill #babel-runtime的时候有兼容es5的polyfill
    // 所以建议使用babel-runtime,如下地址：
    // http://babeljs.io/docs/plugins/transform-runtime/
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.vue'],
    fallback: [path.join(__dirname, '../node_modules')],
    alias: {
      'vux-components': path.join(__dirname, '../node_modules/vux/dist/components'),
      'src': path.resolve(__dirname, '../src'),
      'assets': path.resolve(__dirname, '../src/assets'),
      'components': path.resolve(__dirname, '../src/components')
    }
  },
  resolveLoader: {
    fallback: [path.join(__dirname, '../node_modules')]
  },
  module: {
    preLoaders: [{
      test: /\.vue$/,
      loader: 'eslint',
      include: projectRoot,
      exclude: /node_modules/
    }, {
      test: /\.js$/,
      loader: 'eslint',
      include: projectRoot,
      exclude: /node_modules/
    }, {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: 'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false',
      include: projectRoot,
      exclude: /node_modules/
    }],
    loaders: [{
      test: /\.jade/,
      loader: 'jade'
    }, {
      test: /\.vue$/,
      loader: 'vue'
    }, {
      test: /\.js$/,
      loader: 'babel',
      include: projectRoot,
      exclude: /node_modules(?!\/vuex\/src\/)/
    }, {
      test: /\.json$/,
      loader: 'json'
    }, {
      test: /\.html$/,
      loader: 'vue-html'
    }, {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: 'url',
      query: {
        limit: 1000,
        name: utils.assetsPath('img/[name].[hash:7].[ext]')
      }
    }, {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: 'url',
      query: {
        limit: 1000,
        name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
      }
    }]
  },
  eslint: {
    formatter: require('eslint-friendly-formatter')
  },
  vue: {
    loaders: utils.cssLoaders({ sourceMap: useCssSourceMap }),
    // postcss: [require('autoprefixer')({ browsers: ['Android > 2.3', 'iOS >= 6'] })]
    autoprefixer: {
      browsers: ['last 7 versions'],
      cascade: false // 不美化输出 css
    }
  },
  postcss: [
    require('autoprefixer')({
      browsers: ['last 7 versions']
    })
  ],
  imageWebpackLoader: {
    pngquant: {
      quality: '65-90',
      speed: 4
    },
    svgo: {
      plugins: [{
        removeViewBox: false
      }, {
        removeEmptyAttrs: false
      }]
    }
  }
}
