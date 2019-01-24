### 0.1.17

1、支持`react-ts-redux`组合

### 0.1.16

1、默认开启 `historyApiFallback: true`，当使用`HTML5 history API`时，任何`404`都替换为`index.html`即当前 `/` 路由，当然你也可以自定义devServer，如

```js
devServer: {
  historyApiFallback: true
}
```

### 0.1.15

1、支持`react-ts`组合，暂未支持redux，下个版本支持redux

### 0.1.14

1、修复`react`项目打包不成功问题

### 0.1.13

1、线上配置`optimization`固定默认参数
2、`UglifyjsPlugin`插件配置

  ```js
  {
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
  }
  ```

### 0.1.12

1、fix: CDNPlugin插件build文件报读取文件错误

### 0.1.11

1、fix: 读取配置文件错误

### 0.1.10

1、变更种子项目`webpack`配置，分为`dev`、`test`、`prod`三种环境配置
2、支持输出文件信息文件-`cdnResource.json`、`cdnResource.ini`

### 0.1.8

1、支持`react`项目，`hpack i`根据提示选择相应类型项目
2、内置`postcss`，转`px-vw`

### 0.1.7

1、`hpack i` 之后需要 `npm i` 安装种子项目的依赖

### 0.1.6

1、开发、线上打包后，`dist`中区分`js、css、image`，以目录区分

### 0.1.5

1、开发、线上打包后，dist中区分`js、css`，以目录区分