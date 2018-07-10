#!/usr/bin/env node
/*
 * @Author: huangwei@lianjia.com 
 * @Date: 2018-06-28 10:20:00 
 * @Last Modified by: huangwei@lianjia.com
 * @Last Modified time: 2018-07-10 09:47:22
 * 工具命令集合
 */

const program = require('commander');
const cmdDev = require('../lib/command/dev');
const cmdBuild = require('../lib/command/build');
const cmdInit = require('../lib/command/init');
const cmdPrompt = require('../lib/command/prompt');

const version = require('../package').version

program.version(version, '-v, --version')

program.command('init').alias('i').action(cmd => {
  cmdInit(cmd)
})
program.command('dev').option('-q, --quiet', '开启静默信息').alias('d').action(cmd => {
  cmdDev(process.argv)
})
program.command('build').alias('b').action(cmd => {
  cmdBuild(cmd)
})

program.parse(process.argv)

if (program.args.length < 1) cmdPrompt()
