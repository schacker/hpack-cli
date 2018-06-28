/*
 * @Author: huangwei@lianjia.com 
 * @Date: 2018-06-28 10:47:01 
 * @Last Modified by: huangwei@lianjia.com
 * @Last Modified time: 2018-06-28 10:57:01
 * 工具命令提示信息
 */
const inquirer = require('inquirer');
const cmdDev = require('./dev');
const cmdBuild = require('./build');
const cmdInit = require('./init');
const chalk = require('chalk');
const logger = require('../util');

const version = require('../../package.json').version

function processCmd (cmd) {
  switch (cmd) {
    case 'init':
      cmdInit()
      break
    case 'build':
      cmdBuild()
      break
    case 'dev':
      cmdDev()
      break
    case 'exit':
      process.exit(0)
      break;
    default:
      logger.red('未知选项！退出hpack-cli')
      process.exit(0)
      break
  }
}

const blue = info => chalk.bold.blue(info)
const green = info => chalk.bold.green(info)

module.exports = function () {
  console.log(`欢迎小主使用 ${blue('hpack-cli')} 脚手架，当前版本是${green(version)}`)
  console.log(`初始化项目简写为：${green('hpack i')}`)
  console.log(`开发项目简写为：${green('hpack d')}`)
  console.log(`打包项目简写为：${green('hpack b')}`)
  const question = {
    type: 'rawlist',
    name: 'mode',
    message: '请选择任务类型：',
    choices: [{
      value: 'init',
      name: '生成模板项目(目前只支持vue项目，react开发中)'
    }, {
      value: 'dev',
      name: '开发'
    }, {
      value: 'build',
      name: '打包'
    }, {
      value: 'exit',
      name: '退出'
    }]
  }

  inquirer.prompt([question]).then(answers => {
    processCmd(answers.mode)
  })
}
