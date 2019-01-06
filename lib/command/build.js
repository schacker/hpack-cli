/*
 * @Author: huangwei@lianjia.com 
 * @Date: 2018-06-28 10:23:28 
 * @Last Modified by: huangwei@lianjia.com
 * @Last Modified time: 2019-01-06 16:27:08
 * 构建线上包
 */
const fs = require('fs');
const chalk = require('chalk');
const shell = require('shelljs');
const { logger, ownDir } = require('../util');
const version = require('../../package.json').version

module.exports = function() {
  console.log(`正在使用 hpack dev server ${chalk.green(version)} 打包 ${'prod'}，参数${Array.prototype.slice.call(arguments, 1)}`)

  !fs.existsSync('./src') && logger.fatal('哦哟～找不到源文件 src 目录！请检查当前路径是否正确！')

  if (process.env.NODE_ENV === 'test' || process.env.ENVIRONMENT === 'test') {
    shell.exec(`node ${ownDir('node_modules/webpack/bin/webpack.js')} --config ${ownDir('lib/webpack/webpack.test.js')} --progress --report`)
  } else {
    process.env.NODE_ENV = 'production'
    shell.exec(`node ${ownDir('node_modules/webpack/bin/webpack.js')} --config ${ownDir('lib/webpack/webpack.prod.js')} --progress --report`)
  }
}
