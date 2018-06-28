/*
 * @Author: huangwei@lianjia.com 
 * @Date: 2018-06-28 10:47:07 
 * @Last Modified by:   huangwei@lianjia.com 
 * @Last Modified time: 2018-06-28 10:47:07
 * 工具初始化项目 
 */
const ora = require('ora');
const shell = require('shelljs');
const inquirer = require('inquirer');
const { logger } = require('../util')

const projectDefaultName = 'hpack-vue'
module.exports = function() {
  if (!shell.which('git')) logger.fatal('找不到 git 命令，请先安装 git！')

  const question = [{
    type: 'input',
    name: 'projectName',
    message: `请输入项目名称：（默认【${projectDefaultName}】）`,
    default: projectDefaultName
  }]

  inquirer
    .prompt(question)
    .then(answer => {
      const { projectName } = answer
      const spinner = ora('clone vue template...')
      spinner.start()
      shell.exec(`git clone git@github.com:schacker/hpack-vue.git ${projectName}`, {
            silent: false
          }, (code, error) => {
        spinner.stop()
        if (code !== 0) throw new Error('拷贝模板出错')
        shell.cd(projectName)
        shell.rm('-rf', '.git')
        shell.rm('-rf', '.gitignore')
        logger.log(`项目创建成功能`)
        logger.log(`cd ${projectName}`)
        logger.log(`hpack d`)
      })
    })
}
