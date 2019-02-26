/*
 * @Author: huangwei@lianjia.com 
 * @Date: 2018-06-28 12:09:36 
 * @Last Modified by: huangwei@lianjia.com
 * @Last Modified time: 2019-02-26 10:35:39
 * webpack线上配置
 */
const merge = require('webpack-merge');
const Webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const common = require('./webpack.common.js');

const {
  getConfig,
} = require('../util')

const {
  webpack = {}
} = getConfig('test')

const plugins = [
  new MiniCssExtractPlugin({
    filename: 'css/[name].[chunkhash:4].css',
    chunkFilename: 'css/[id].[chunkhash:4].css'
  }),
  new Webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production')
  }),
  new Webpack.HashedModuleIdsPlugin()
]
const modules = {}

if (webpack.mini === true) {
  plugins.push(new MINIPlugin())
  // 编译检测报警
  modules.rules = [{
    test: /\.jsx?|\.tsx?|\.vue/,
    use: ['MINILoader']
  }]
  webpack.output.libraryTarget = 'umd'
  webpack.output.globalObject =
    '(' +
    'typeof window !== "undefined" ? window : ' +
    'typeof self !== "undefined" ? self : ' +
    'typeof global !== "undefined" ? global : ' +
    'typeof this !== "undefined" ? this : ' +
    '{}' +
    ')'
}
const ismini = webpack.mini

delete webpack.mini

module.exports = merge.smart(common({}, {mode: 'production'}), {
  mode: 'production',
  plugins: plugins,
  module: modules,
  devtool: 'source-map',
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: true
      }),
      new OptimizeCSSAssetsPlugin({})
    ],
    splitChunks: {
      cacheGroups: {
        // 抽取
        vendors: !!ismini ? false : {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all"
        },
        // commons: {
        //     name: "commons",
        //     chunks: "initial",
        //     minChunks: 2
        // }
      }
    }
  }
}, webpack);
