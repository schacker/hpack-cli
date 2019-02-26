/*
 * @Author: huangwei@lianjia.com 
 * @Date: 2019-02-18 15:51:29 
 * @Last Modified by: huangwei@lianjia.com
 * @Last Modified time: 2019-02-18 16:34:55
 * 小程序编译检测
 */
"use strict";
const {
  logger
} = require('../util');
// const loaderUtils = require("loader-utils");

module.exports = function (content) {
  // 使用 loaderUtils 来获取 loader 的配置项
  // this 是构建运行时的一些上下文信息
  // const options = loaderUtils.getOptions(this);

  this.cacheable();

  // console.log('MINILoader', content)
  if (typeof content === 'string' && content.match(/window\.(\w){1,10}/)) {
    // 编译报警，检测除了设置globalObject之外的js相关代码
    logger.red('\n Error: window object is not allowed in miniprogram mode \n')
    throw new Error('window object is not allowed in miniprogram mode')
  }

  return content;
};