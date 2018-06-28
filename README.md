# hpack-cli

> hpack-cli支持生成种子项目，开发，与输出生产环境的代码

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
hpack i   生成种子文件
hpack d   开发
hpack b   构建
```

### 特性

- hpack-cli内置了vue,vuex,vue-router,axios,jsonp,ramda,jquery,无需二次安装
- 支持es6语法，支持async,await,支持装饰器
- eslint采用standard规范
- 支持pug语法，stylus, scss
- 生产环境图片会自动压缩
- 支持单页应用，多页应用，支持项目集结构
- 支持少量的配置项
- 生产环境支持代码分割，懒加载，打哈希串

### 目录结构

```s
+ vue-project
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
hpack d
```
