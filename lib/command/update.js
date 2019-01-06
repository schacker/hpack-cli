/*
 * @Author: huangwei@lianjia.com 
 * @Date: 2019-01-06 18:23:29 
 * @Last Modified by: huangwei@lianjia.com
 * @Last Modified time: 2019-01-06 19:01:30
 */

const pkg = require('../../package.json')
const execa = require('execa')
const os = require('os')

module.exports = () => {
  const currentPath = os.homedir()
  console.log('update...')

  const spawned = execa('npm', ['config', 'set', 'registry', 'https://registry.npmjs.com/'], {
    cwd: currentPath
  })
  spawned.stdout.pipe(process.stdout)
  spawned.stderr.pipe(process.stderr)

  spawned.then(() => {

    const intallSpawn = execa('npm', [`i`, pkg.name, '-g'], {
      cwd: currentPath
    })
    intallSpawn.stdout.pipe(process.stdout)
    intallSpawn.stderr.pipe(process.stderr)

    intallSpawn.then(() => {
      console.log('update success')
    }).catch((err) => {
      console.log('install error')
      console.error(err)
    })

  }).catch((e) => {
    console.error(e)
  })
}
