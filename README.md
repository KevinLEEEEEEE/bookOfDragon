colorMixer
===========

## 设计稿一

![image](https://github.com/KevinLEEEEEEE/bookOfDragon/blob/master/src/image/xwz.jpg)

##设计稿2

![image](https://github.com/KevinLEEEEEEE/bookOfDragon/blob/master/src/image/xwz2.jpg)

## 如何使用

1. 下载压缩包
2. 打开 "./dist" 文件夹
3. 打开 "index.html"
4. 注意请用火狐浏览器打开，chrome有跨域访问限制，会影响webworker调用

## Requirements
You only need <b>node.js</b> pre-installed and you’re good to go. 

If you don’t want to work with lodash, just remove it from the node packages and the webpack config.

## Download
Download in current directory
```sh
$ curl -L -o master.zip https://github.com/cvgellhorn/webpack-boilerplate/archive/master.zip && unzip master.zip && rm master.zip && mv ./webpack-boilerplate-master/{.,}* ./ && rm -r ./webpack-boilerplate-master
```

## Setup
Install dependencies
```sh
$ npm install
```

## Development
Run the local webpack-dev-server with livereload and autocompile on [http://localhost:8080/](http://localhost:8080/)
```sh
$ npm run dev
```
## Deployment
Build the current application
```sh
$ npm run build
```

## [webpack](https://webpack.js.org/)
If you're not familiar with webpack, the [webpack-dev-server](https://webpack.js.org/configuration/dev-server/) will serve the static files in your build folder and watch your source files for changes.
When changes are made the bundle will be recompiled. This modified bundle is served from memory at the relative path specified in publicPath.
