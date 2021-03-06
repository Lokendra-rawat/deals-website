const path = require('path');
const webpack = require('webpack')

const VENDOR_LIBS = [
  'redux', 'react-redux', 'react-dom'
]

module.exports = {
  entry: {
    firstComp: './views/src/index.js'
    // regularJS: './assets/js/regularJS.js',
    // vendor: VENDOR_LIBS
  },
  output: {
    path: path.resolve(__dirname, 'public/javascripts'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
    {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['es2015','stage-0','react']
        }
      }
    },
    {
      test: /\.scss$/,
      use: [{
        loader: "style-loader"
      }, {
        loader: "css-loader",
        options: {
          sourceMap: true
        }
      }, {
        loader: "sass-loader",
        options: {
          sourceMap: true
        }
      }]
    }]
  }
  // ,
  // plugins: [
  //   new webpack.optimize.CommonsChunkPlugin({
  //     name: 'vendor',
  //     minChunks: function(module) {
  //       // this assumes your vendor imports exist in the node_modules directory
  //       return module.context && module.context.indexOf('node_modules') !== -1;
  //     }
  //   }),
  //   //         new webpack.optimize.UglifyJsPlugin({
  //   //   sourceMap: options.devtool && (options.devtool.indexOf("sourcemap") >= 0 || options.devtool.indexOf("source-map") >= 0)
  //   // }),
  //   // new webpack.Define
  //   // new webpack.optimize.CommonsChunkPlugin({
  //   //     name: 'manifest' //But since there are no more common modules between them we end up with just the runtime code included in the manifest file
  //   // })
  // ]
};