/*
 * @Author: huangwei@lianjia.com 
 * @Date: 2018-06-28 12:09:36 
 * @Last Modified by: huangwei@lianjia.com
 * @Last Modified time: 2019-01-09 15:27:46
 * webpack线上配置
 */
const merge = require('webpack-merge');
const Webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const common = require('./webpack.common.js');

const {
  getConfig
} = require('../util')

const {
  webpack = {}
} = getConfig('prod')

module.exports = merge.smart(common({}, {mode: 'production'}), {
  mode: 'production',
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[chunkhash:4].css',
      chunkFilename: 'css/[id].[chunkhash:4].css'
    }),
    new Webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new Webpack.HashedModuleIdsPlugin()
  ],
  devtool: 'source-map',
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          ie8: false, //是否支持ie8，default-false
          ecma: 8, //支持的ecma标准，default-undefined，parse、compress、output生效
          compress: {
            // 屏蔽警告
            warnings: false,
            // 去掉console
            drop_console: true
          },
          output: {
            comments: false //去掉注释
          },
          warnings: false //去掉警告
        },
        parallel: true, //允许并发，并发数为os.cpus().length-1
        sourceMap: true
      }),
      new OptimizeCSSAssetsPlugin({})
    ],
    splitChunks: {
      /** 默认 start */
      chunks: "async",
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      /** 默认 end */
      /**
       * 默认将所有来源于node_modules的模块分配到叫做 'vendors'的缓存组
       * 所有引用超过两次的模块分配到 'default' 缓存组
       * 一个模块可以被分配到多个缓存组，这个优化可以通过选择更高优先级的缓存组或者形成代码块更大的缓存组来完成
       * 
       * 缓存组默认继承splitChunks的配置项, 但是test, priority和reuseExistingChunk只能在缓存组中被配置.
       * 缓存组是一个是缓存组名字作为键值的对象.除了上述代码块中列举的配置项还有: chunks, minSize, minChunks, maxAsyncRequests, maxInitialRequests, name.
       * 你可以设置optimization.splitChunks.cacheGroups.default = false来禁用默认缓存组,vendors也可以同样禁用.
       * 为了能够让自定义缓存组有更高的优先级(默认0), 默认缓存组的priority属性为负值
       */
      cacheGroups: {
        /** 默认 start */
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        },
        /** 默认 end */
        // 抽取
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all" //initial async all，指定哪些代码块会被分割
        },
        /**
         * 自定义缓存组
         * 名为commons 包含入口初始化的共享代码
         * 这样会增大初始化包，非立即需要建议动态加载
         * */
        // commons: {
        //     name: "commons",
        //     chunks: "initial", //initial async all，指定哪些代码块会被分割
        //     minChunks: 2 //被引用两次及以上就分割
        // }
      }
    }
  }
}, webpack);
