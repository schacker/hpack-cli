/*
 * @Author: huangwei@lianjia.com 
 * @Date: 2018-06-28 10:19:26 
 * @Last Modified by: huangwei@lianjia.com
 * @Last Modified time: 2019-01-06 20:33:57
 * 工具类
 */
const chalk = require('chalk')
const path = require('path')
const fs = require('fs')
const R = require('ramda')

const prefix = '  hpack-cli'
const sep = chalk.gray('·')

function loggerCreator(isException) {
  return function(msg) {
    if (isException) {
      console.error(chalk.red(prefix), sep, msg)
      process.exit(1)
    }
    console.log(chalk.white(prefix), sep, msg)
  }
}
// 获取定义配置，函数或对象
const generateConfig = path => {
  const cfg = require(util.cwd(path))
  if (typeof cfg === 'function') {
    return cfg({})
  } else {
    return cfg
  }
}

const util = {
  logger: {
    log: loggerCreator(false),
    fatal: loggerCreator(true),
    red: info => console.log(chalk.red(info)),
    blue: info => console.log(chalk.blue(info)),
    green: info => console.log(chalk.green(info))
  },
  cwd: file => path.resolve(file || ''), //获取当前系统格式的文件绝对路径
  ownDir: file => path.join(__dirname, '../..', file || ''),
  getProjectName: R.memoize(_ => path.resolve('').split(path.sep).pop()),
  getConfig: R.memoize(_ => { //获取最终merge配置
    let config = {}
    // 如果是项目集，项目集也会有个config.js
    if (fs.existsSync('../config.js')) {
      config = R.merge(config, generateConfig('../config'))
    }
    // 兼容老版本，无webpack/webpack.*.js配置
    if (fs.existsSync('./config.js')) {
      config = R.merge(config, generateConfig('config.js'))
    }
    switch (_) {
      case 'dev':
        if (fs.existsSync('webpack/webpack.dev.js')) {
          config = R.merge(config, generateConfig('webpack/webpack.dev.js'))
        }
        break;
      case 'test':
        if (fs.existsSync('webpack/webpack.test.js')) {
          config = R.merge(config, generateConfig('webpack/webpack.test.js'))
        }
        break;
      case 'prod':
      default:
        if (fs.existsSync('webpack/webpack.prod.js')) {
          config = R.merge(config, generateConfig('webpack/webpack.prod.js'))
        }
        break;
    }
    return config
  })
}

module.exports = util
