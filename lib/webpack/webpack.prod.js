/*
 * @Author: huangwei@lianjia.com 
 * @Date: 2018-06-28 12:09:36 
 * @Last Modified by: huangwei@lianjia.com
 * @Last Modified time: 2018-06-28 15:55:05
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
} = getConfig()

module.exports = merge.smart(common({}, {mode: 'production'}), {
  mode: 'production',
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[chunkhash:4].css',
      chunkFilename: '[id].[chunkhash:4].css'
    }),
    new Webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new Webpack.HashedModuleIdsPlugin()
  ],
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
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all"
        },
        commons: {
            name: "commons",
            chunks: "initial",
            minChunks: 2
        }
      }
    }
  }
}, webpack);
