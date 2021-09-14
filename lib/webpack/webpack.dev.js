/*
 * @Author: huangwei@lianjia.com 
 * @Date: 2018-06-28 12:08:34 
 * @Last Modified by: huangwei@lianjia.com
 * @Last Modified time: 2019-01-22 11:52:51
 * webpack dev配置
 */
const Webpack = require('webpack')
const merge = require('webpack-merge');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const EasyConfigMock = require('@schacker/easy-config-mock');
const common = require('./webpack.common.js');
const { cwd } = require('../util')

const {
  getConfig
} = require('../util')

const {
  port = 8018,
  webpack = {},
  proxy = {},
  devtool = 'inline-source-map'
} = getConfig('dev')

new EasyConfigMock({
  path: cwd('mock.config.js')
})

let config = merge.smart(common({}, {mode: 'development'}), {
  mode: 'development',
  devtool,
  devServer: {
    // contentBase: cwd('dist'),
    historyApiFallback: true,
    hot: true,
    open: true,
    // quiet: true,  // necessary for FriendlyErrorsPlugin
    port,
    proxy,
    // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-
    // watchOptions: {
    //   poll: false
    // }
  },
  plugins: [
    new FriendlyErrorsPlugin(),
    // new Webpack.NamedModulesPlugin(),
    new Webpack.HotModuleReplacementPlugin()
  ]
}, webpack);
module.exports = config
