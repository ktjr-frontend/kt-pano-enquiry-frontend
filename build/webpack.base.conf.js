var path = require('path')
var config = require('../config')
var utils = require('./utils')
var projectRoot = path.resolve(__dirname, '../')

module.exports = {
  entry: {
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
      test: /\.vue$/,
      loader: 'vue'
    }, {
      test: /\.js$/,
      loader: 'babel',
      include: projectRoot,
      exclude: /node_modules/
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
    loaders: utils.cssLoaders(),
    // postcss: [require('autoprefixer')({ browsers: ['Android > 2.3', 'iOS >= 6'] })]
    autoprefixer: {
      browsers: ['Android > 2.3', 'iOS >= 6', 'last 7 versions'],
      cascade: false // 不美化输出 css
    }
  },
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
