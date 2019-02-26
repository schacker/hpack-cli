/*
 * @Author: huangwei@lianjia.com 
 * @Date: 2019-02-15 14:57:49 
 * @Last Modified by: huangwei@lianjia.com
 * @Last Modified time: 2019-02-18 16:10:39
 * plugin 的实现可以是一个类， 使用时传入相关配置来创建一个实例， 然后放到配置的 plugins 字段中， 而 plugin 实例中最重要的方法是 apply，
 * 该方法在 webpack compiler 安装插件时会被调用一次， apply 接收 webpack compiler 对象实例的引用，
 * 你可以在 compiler 对象实例上注册各种事件钩子函数， 来影响 webpack 的所有构建流程， 以便完成更多其他的构建任务。
 */
const chalk = require('chalk')

const pluginName = 'MINIPlugin'

const Log = (str, obj) => {console.log(chalk.blue('\n'+str)); obj && console.log(obj, +'\n')}


class MINIPlugin {
  constructor(options) {
    this.options = options
  }

  apply(compiler) {
    // 在 compiler 的 emit hook 中注册一个方法，当 webpack 执行到该阶段时会调用这个方法
    compiler.hooks.emit.tap(pluginName, (stats) => {
      // Log('emit')
    })

    compiler.hooks.compile.tap(pluginName, (compilationParams) => {
      // Log('compile')
    })
    compiler.hooks.compilation.tap(pluginName, (compilation) => {
      compilation.hooks.optimize.tap(pluginName, (coms) => {
        // Log('compilation.hooks')
      })
    })
    compiler.hooks.done.tap(pluginName, (stats) => {
      // Log('done')
    })
    compiler.hooks.failed.tap(pluginName, (compilation) => {
      // Log('failed')
    })
    compiler.hooks.afterEmit.tap(pluginName, (compilation) => {
      // Log('afterEmit')
    })
    compiler.hooks.run.tapAsync(pluginName, (compilation,callback) => {
      // Log('run')
      callback()
    })
    compiler.hooks['watchRun'].tap(pluginName, (compilation) => {
      // Log('watchRun')
    })
  }
}

module.exports = MINIPlugin