const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const shell = require('shelljs');
const {
  logger
} = require('../util');
const version = require('../../package.json').version

module.exports = function () {
  let args = []
  if (arguments[0]) {
    args = Array.prototype.slice.call(arguments[0], 3)
  }
  const _args = args.join(' ')
  console.log(`正在使用 hpack dev server ${chalk.green(version)} 开发 ${'dev'}，参数${_args}`)

  !fs.existsSync('./src') && logger.fatal('哦哟～找不到源文件 src 目录！请检查当前路径是否正确！')

  process.env.NODE_ENV = 'development'
  shell.exec(`node ${path.resolve(__dirname, '../../node_modules/webpack-dev-server/bin/webpack-dev-server.js')} ${_args} --config ${path.resolve(__dirname, '../webpack/webpack.dev.js')} --color`)
}
