#!/usr/bin/env node
/*
 * @Author: huangwei@lianjia.com 
 * @Date: 2018-06-28 10:20:00 
 * @Last Modified by: huangwei@lianjia.com
 * @Last Modified time: 2019-02-15 15:29:12
 * 工具命令集合
 */

const program = require('commander');
const cmdDev = require('../lib/command/dev');
const cmdBuild = require('../lib/command/build');
const cmdInit = require('../lib/command/init');
const cmdCheckUpdate = require('../lib/command/checkUpdate');
const cmdUpdate = require('../lib/command/update');
const cmdPrompt = require('../lib/command/prompt');

const version = require('../package').version

program.version(version, '-v, --version')

program.command('checkUpdate').alias('c').action(cmd => {
  cmdCheckUpdate(cmd)
})
program.command('update').alias('u').action(cmd => {
  cmdUpdate(cmd)
})
program.command('init').alias('i').action(cmd => {
  cmdInit(cmd)
})
program.command('dev').option('-q, --quiet', '开启静默信息').alias('d').action(cmd => {
  cmdDev(process.argv)
})
program.command('build').option('-m, --mini, MINI小程序打包模式').alias('b').action(cmd => {
  cmdBuild(cmd)
})

program.parse(process.argv)

if (program.args.length < 1) cmdPrompt()
