/*
 * @Author: huangwei@lianjia.com 
 * @Date: 2018-06-28 12:08:15 
 * @Last Modified by: huangwei@lianjia.com
 * @Last Modified time: 2019-01-28 20:20:34
 * webpack公共配置
 */
const path = require('path');
const fs = require('fs');
const glob = require('glob');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const EslintFriendlyFormatter = require('eslint-friendly-formatter');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const os = require('os')
const HappyPack = require('happypack')
// const chunk_poly = require('../poly/chunk_poly.js')
const { CheckerPlugin } = require('awesome-typescript-loader');
const ChunkPlugin = require('../plugins/CDNPlugin.js')

const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length }) //利用多cpu资源，多进程管理
const {
  cwd,
  ownDir,
} = require('../util')

let isDev = process.env.NODE_ENV !== 'production' //改用mode

const entry = {}
const htmlPlugins = []
// 生成html页面
glob.sync(cwd('./src/*.@(js|jsx|tsx|ts)')).forEach((filePath) => {
  const name = path.basename(filePath, path.extname(filePath))
  const artPath = cwd(`${name}.art`)
  if (fs.existsSync(artPath)) {
    htmlPlugins.push(new HtmlWebpackPlugin({
      filename: `${name}.html`,
      template: artPath
    }))
  }
  entry[name] = filePath
})

module.exports = (env, argv) => {
  if (argv.mode) {
    isDev = argv.mode !== 'production'
  }
  return {
    entry,
    plugins: [
      // 当遇到$标识符的时候，自动加载jquery
      new webpack.ProvidePlugin({
        $: 'jquery'
      }),
      new CleanWebpackPlugin(['dist'], {
        root: cwd()
      }),
      new VueLoaderPlugin(),
      new HappyPack({
        id: 'eslint',
        verbose: false,
        loaders: [
          {
            loader: "eslint-loader",
            options: {
              configFile: ownDir('lib/config/eslint.config.js'),
              formatter: EslintFriendlyFormatter
            }
          }
        ],
        threadPool: happyThreadPool
      }),
      new HappyPack({
        id: 'js',
        verbose: false,
        loaders: [
          {
            loader: 'babel-loader',
            query: require(ownDir('lib/config/babel.config.js'))
          }
        ],
        threadPool: happyThreadPool
      }),
      new ChunkPlugin(),
      new CheckerPlugin()
    ].concat(htmlPlugins),
    output: {
      filename: isDev ? 'js/[name].js' : 'js/[name].[chunkhash:4].js',
      chunkFilename: isDev ? 'js/[name].js' : 'js/[name].[chunkhash:4].js',
      path: cwd('dist'),
      publicPath: '/'
    },
    resolve: {
      alias: {
        '@': cwd('src'),
        'vue$': 'vue/dist/vue.esm.js'
      },
      modules: ['node_modules', cwd(), cwd('node_modules'), ownDir('node_modules')],
      extensions: ['.js', '.vue', '.styl', '.jsx', '.ts', '.tsx', '.json']
    },
    resolveLoader: {
      modules: ['node_modules', cwd(), cwd('node_modules'), ownDir('node_modules')]
    },
    module: {
      rules: [
        {
          test: /\.pug$/,
          use: [
            'pug-plain-loader'
          ]
        },
        {
          test: /\.css$/,
          use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                config: {
                  path: ownDir('lib/config/postcss.config.js')
                }
              }
            }
          ]
        },
        {
          test: /\.styl(us)?$/,
          use: [
            isDev ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                config: {
                  path: ownDir('lib/config/postcss.config.js')
                }
              }
            },
            'stylus-loader'
          ]
        },
        {
          test: /\.scss$/,
          use: [
            isDev ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                config: {
                  path: ownDir('lib/config/postcss.config.js')
                }
              }
            },
            'sass-loader'
          ]
        },
        {
          test: /\.vue$/,
          use: [
            'vue-loader'
          ]
        },
        {
          enforce: "pre",
          test: /\.(jsx?|vue)$/,
          exclude: /node_modules/,
          loader: 'happypack/loader?id=eslint'
          // loader: "eslint-loader",
        },
        {
          test: /\.jsx?$/,
          // In order to ensure JS transpilation is applied to Vue SFCs in node_modules, you need to whitelist them by using an exclude function instead:
          exclude: file => (
            /node_modules/.test(file) && !/\.vue\.js/.test(file)
          ),
          include: [path.resolve(__dirname, 'src')],
          use: [
            {
              // loader: 'babel-loader',
              loader: 'happypack/loader?id=js'
            },{
              loader: 'babel-loader'
            }
          ]
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [{
            loader: 'babel-loader',
            options: {
              "presets": [
                "react",
                "es2015",
                "stage-0"
              ],
              "plugins": [
                ["transform-runtime", {
                  "helpers": false, // defaults to true
                  "polyfill": false, // defaults to true
                  "regenerator": true, // defaults to true
                  "moduleName": "babel-runtime" // defaults to "babel-runtime"
                }],
              ] // End plugins
            }
          }],
        },
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,   //特么的坑死我了，哎
          use: [{
            loader: 'awesome-typescript-loader'
          }]
        },
        {
          test: /\.art$/,
          use: [
            'art-template-loader'
          ]
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: [
            'file-loader'
          ]
        },
        {
          test: /\.(png|svga?|jpg|gif)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                outputPath: 'images/', //输出文件路径前缀
                limit: 8192,
                fallback: 'file-loader'
              }
            }
          ].concat(isDev ? [] : [
            {
              loader: 'image-webpack-loader',
              options: {
                pngquant: {
                  speed: 4,
                  quality: '75-90'
                },
                optipng: {
                  optimizationLevel: 7
                },
                mozjpeg: {
                  quality: 70,
                  progressive: true
                },
                gifsicle: {
                  interlaced: false
                }
              }
            }
          ])
        },
        {
          test: /anything\//,
          use: 'file-loader'
        }
      ]
    }
  }
};
