/*
 * @Author: huangwei@lianjia.com 
 * @Date: 2018-06-28 10:16:33 
 * @Last Modified by: huangwei@lianjia.com
 * @Last Modified time: 2018-06-28 10:17:08
 * eslint配置相关
 */
const R = require('ramda')
const { getConfig } = require('../util')

const {
  rules = {},
  eslintConfig = {}
} = getConfig()

module.exports = R.merge({
  extends: [
    'standard',
    'plugin:vue/essential',
    'plugin:react/recommended'
  ],
  rules: R.merge({
    'no-unused-vars': 1,
    'no-new': 0,
    "react/prop-types": "off",
    "react/display-name": "off"
  }, rules),
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  plugins: [
    'vue'
  ]
}, eslintConfig)
