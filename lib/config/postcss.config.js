/*
 * @Author: huangwei@lianjia.com 
 * @Date: 2018-06-28 10:18:22 
 * @Last Modified by: huangwei@lianjia.com
 * @Last Modified time: 2019-01-28 19:03:27
 * postcss相关配置
 */
const R = require('ramda')
const { getConfig } = require('../util')
const {
  viewportWidth = 750,
  viewportHeight = 1334,
  postcssPlugin = {}
} = getConfig()

module.exports = R.merge({
  "plugins": {
    "postcss-import": {},
    "postcss-url": {},
    "postcss-aspect-ratio-mini": {},
    "postcss-write-svg": {
      utf8: false
    },
    "postcss-cssnext": {},
    "postcss-px-to-viewport": {
      viewportWidth,
      viewportHeight,
      unitPrecision: 3,
      viewportUnit: 'vw',
      selectorBlackList: ['.ignore', '.hairlines'],
      minPixelValue: 1,
      mediaQuery: false
    },
    "postcss-viewport-units":{},
    "cssnano": {
      preset: "advanced",
      autoprefixer: false,
      "postcss-zindex": false
    }
  }
}, postcssPlugin)
