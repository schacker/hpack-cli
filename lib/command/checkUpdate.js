/*
 * @Author: huangwei@lianjia.com 
 * @Date: 2019-01-06 18:14:37 
 * @Last Modified by: huangwei@lianjia.com
 * @Last Modified time: 2019-01-06 19:27:55
 */

const pkg = require('../../package.json')
const update = require('./update')
const request = require('request')
const {
  logger
} = require('../util')

const npm_req_url = 'https://registry.npmjs.com'

const checkVersion = (callback) => {
  const hpackInfo = `${npm_req_url}/${pkg.name}`

  console.log(`send request to ${hpackInfo}`)
  request(hpackInfo,(error,response,body)=>{
    if(error || !body){
      callback && callback(false)
      return
    }
    const info = JSON.parse(body)
    if(info['dist-tags'].latest != pkg.version){
     callback && callback(true, true)
    return
    }
    callback(true, false)
  })
}


module.exports = () => {

  checkVersion((err,check)=>{
    if(!err){
      console.error('check fail')
      return
    }
    if(check){
      logger.blue('有新版本hpack，请及时升级 hpack update')
      // update()
    }else{
      console.log('工具为最新,不进行更新')
    }
  })
}
