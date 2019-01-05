/*
 * @Author: huangwei@lianjia.com 
 * @Date: 2018-06-28 10:47:07 
 * @Last Modified by: huangwei@lianjia.com
 * @Last Modified time: 2019-01-04 15:43:22
 * 工具初始化项目 
 */
const ora = require('ora');
const shell = require('shelljs');
const inquirer = require('inquirer');
const { logger } = require('../util')

let projectDefaultName = 'hpack-react'
let projectTypeDefaultName = 'react'
module.exports = function() {
  if (!shell.which('git')) logger.fatal('找不到 git 命令，请先安装 git！')

  const questionPType = [{
    type: 'input',
    name: 'projectType',
    message: `请输入项目类型（vue or react）：（默认【${projectTypeDefaultName}】）`,
    default: projectTypeDefaultName
  }]
  const question = [{
    type: 'input',
    name: 'projectName',
    message: `请输入项目名称：（默认【${projectDefaultName}】）`,
    default: projectDefaultName
  }]

  let spinnerStr = 'clone vue template...' //clone 项目提示
  let gitUrl = `git clone git@github.com:schacker/hpack-vue.git` //seed项目git地址
  let projectName = projectDefaultName //项目名称

  // 项目类型
  inquirer
    .prompt(questionPType)
    .then(answer => {
      const { projectType = 'react'} = answer
      if (projectType === 'react') {
        spinnerStr = 'clone react template...'
        gitUrl = `git clone git@github.com:schacker/hpack-react.git`
      } else {
        projectDefaultName = 'hpack-vue'
        question[0].message = `请输入项目名称：（默认【${projectDefaultName}】）`
        question[0].default = projectDefaultName
        gitUrl = `git clone git@github.com:schacker/hpack-vue.git`
      }
      askName()
    })
  function askName() {
    // 项目名称
    inquirer
      .prompt(question)
      .then(answer => {
        const {
          projectName = projectDefaultName,
        } = answer
        gitUrl = `${gitUrl} ${projectName}`
        const spinner = ora(spinnerStr)
        spinner.start()
        shell.exec(gitUrl, {
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
}
