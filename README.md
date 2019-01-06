# hpack-cli

> `hpack-cli`支持生成(react or vue)模板项目，开发，与输出生产环境的代码

### 安装

```s
npm i @schacker/hpack-cli -g
or
yarn global add @schacker/hpack-cli
```

> window平台请使用管理员权限安装，mac平台请在命令前面加上sudo

如果你不想全局安装的话

```s
git clone git@github.com:schacker/hpack-cli.git
cd hpack-cli
npm i / yarn
npm link
```

### 使用

```s
hpack -v  输出版本号
hpack     命令集
hpack c   检查版本
hpack u   版本升级
hpack i   生成种子文件
hpack d   开发
hpack b   构建
```

### 特性

- `hpack-cli` 内置了 `axios`, `jsonp`, `ramda`, `jquery`,无需二次安装
- 支持 `es6` 语法，支持 `async`, `await`, 支持装饰器
- `eslint` 采用 `standard` 规范
- 支持 `pug` 语法，`stylus`, `scss`
- 生产环境图片会自动压缩
- 支持单页应用，多页应用，支持项目集结构
- 支持少量的配置项
- 生产环境支持代码分割，懒加载，打哈希串
- 支持打包多个环境，主要是为了fix按需加载使用 `publicPath`

  -如使用 `ENVIRONMENT=test hpack b`，则打包配置会读取`webpack/webpack.test.js`配置，如果相应环境没做配置，则使用默认的 `/` 路径
  
  -如使用 `ENVIRONMENT=production hpack b`，则打包配置会读取`webpack/webpack.prod.js`配置，如果相应环境没做配置，则使用默认的 `/` 路径

  -打包后会在指定路径默认（`dist`）生成打包文件及文件信息，`cdnResource.json`,`cdnResource.ini`

### 目录结构

```s
+ react-project
+   src
-     index.js
    index.art       // 每一个xxx.art对应src目录的xxx.js，开发多页应用只需要增加这两个文件
    mock.config.js  // 必须：mock服务的配置文件
    config.js       // 必须：配置文件
```

### 开发

先生成种子文件，再开发

```s
hpack i
cd projectName
npm i
hpack d
```
