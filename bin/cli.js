#!/usr/bin/env node
/*
 * @Author: huangwei@lianjia.com 
 * @Date: 2018-06-28 10:20:00 
 * @Last Modified by: huangwei@lianjia.com
 * @Last Modified time: 2018-06-28 10:20:20
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
  cmdInit()
})
program.command('dev').alias('d').action(cmd => {
  cmdDev()
})
program.command('build').alias('b').action(cmd => {
  cmdBuild()
})

program.parse(process.argv)

if (program.args.length < 1) cmdPrompt()
