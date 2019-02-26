/*
 * @Author: huangwei@lianjia.com 
 * @Date: 2019-01-06 16:48:21 
 * @Last Modified by: huangwei@lianjia.com
 * @Last Modified time: 2019-02-19 10:28:04
 * plugin 的实现可以是一个类， 使用时传入相关配置来创建一个实例， 然后放到配置的 plugins 字段中， 而 plugin 实例中最重要的方法是 apply，
 * 该方法在 webpack compiler 安装插件时会被调用一次， apply 接收 webpack compiler 对象实例的引用，s
 * 你可以在 compiler 对象实例上注册各种事件钩子函数， 来影响 webpack 的所有构建流程， 以便完成更多其他的构建任务。
 */
const chalk = require('chalk')
const SyncHook = require('tapable').SyncHook;

const pluginName = 'FileListPlugin'
const path = require("path")
const fs = require("fs")
// const hpackConfig = require('../webpack/webpack.prod.js')
const {
  cwd
} = require('../util')

const Log = (str, obj) => {console.log(chalk.green('\n'+str)); console.log(obj, +'\n')}

const addPath = (str) => {
  if (str[0] == '/') {
    return str
  }
  return '/' + str
}
const staticOutput = null

const getStaticJSON = (modules) => {
  const rs = {}
  if (staticOutput && fs.existsSync(staticOutput)) {

    try {
      const staticFile = require(staticOutput)
      staticFile.forEach(f => {
        const mo = modules.find((item) => {
          return item.name.indexOf(f) >= 0
        })
        if (mo) {
          rs['/statics' + addPath(f)] = addPath(mo.assets[0])
        } else {
          console.warn(f + ' not find ')
        }
      })
    } catch (e) {
      console.error(e)
    }
  }
  return rs
}

class FileListPlugin {
  constructor(options) {
    this.options = options
  }

  apply(compiler) {
    
    if (compiler.hooks.myCustomHook) throw new Error('Already in use');
    compiler.hooks.myCustomHook = new SyncHook(['a', 'b', 'c']);

    // 在 compiler 的 emit hook 中注册一个方法，当 webpack 执行到该阶段时会调用这个方法
    compiler.hooks.emit.tap(pluginName, (stats) => {
      
    })

    compiler.hooks.compile.tap(pluginName, (compilation) => {
      // Log('compile', compilation.chunks)
    })
    compiler.hooks.compilation.tap(pluginName, (compilation) => {
      compilation.hooks.optimize.tap(pluginName, (coms) => {
        // Log('compilation.hooks', coms)
      })
    })
    compiler.hooks.done.tap(pluginName, (compilation) => {
      var statsJson = compilation.toJson()
      var chunkName = statsJson.assetsByChunkName

      var result = {};
      for (var key in chunkName) {
        var sourceMapping = chunkName[key];
        sourceMapping = [].concat(sourceMapping)
        sourceMapping.forEach && (
          sourceMapping.forEach(function (a) {
            var extname = path.extname(a);
            var arr = a.split(".");
            arr.pop();
            arr.pop();
            arr.push(extname)
            var name = "/" + arr.join("");
            result[name] = "/" + a;
          })
        )
      }

      const staticJson = getStaticJSON(statsJson.modules)
      Object.assign(result, staticJson)


      const iniContent = []
      for (var i in result) {
        iniContent.push(`${i}=${result[i]}`)
      }

      const destPath = cwd('dist')
      if (fs.existsSync(destPath)) {
        try {
          fs.writeFileSync(
            path.join(destPath, "cdnResource.json"),
            JSON.stringify(result));
          fs.writeFileSync(
            path.join(destPath, "cdnResource.ini"),
            iniContent.join("\n"));
        } catch (e) {
          console.error(e)
        }
      }
      // Log('Successful done!', {
      //   distPath: destPath,
      //   fileInfo: 'cdnResource.json && cdnResource.ini'
      // })
    })
    compiler.hooks.failed.tap(pluginName, (compilation) => {
      // Log('failed', compilation.chunks)
    })
    compiler.hooks.afterEmit.tap(pluginName, (compilation) => {
      // Log('afterEmit', compilation.chunks.length)
    })
    compiler.hooks.run.tapAsync(pluginName, (compilation,callback) => {
      // Log('run', compilation.chunks)
      callback()
    })
    compiler.hooks['watchRun'].tap(pluginName, (compilation) => {
      // Log('watchRun', compilation.chunks)
    })
  }
}

module.exports = FileListPlugin