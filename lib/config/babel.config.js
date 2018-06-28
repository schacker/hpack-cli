/*
 * @Author: huangwei@lianjia.com 
 * @Date: 2018-06-28 10:14:47 
 * @Last Modified by: huangwei@lianjia.com
 * @Last Modified time: 2018-06-28 10:15:37
 * babel相关配置
 */
const { ownDir, getConfig } = require('../util')
const {
  babelPlugins = [],
  babelPresets = []
} = getConfig()

module.exports = {
  filename: ownDir('lib/config/babel.config.js'),
  presets: [
    [
      'env',
      // 启动懒加载
      {
        modules: false
      }
    ],
    'stage-2'
  ].concat(babelPresets),
  plugins: [
    'transform-runtime',
    'transform-decorators-legacy'
  ].concat(babelPlugins)
}
