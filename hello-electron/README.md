## Electron 入门学习(一)

[Electron](https://electronjs.org) 是由`Github`开发，用`HTML，CSS和JavaScript`来构建跨平台桌面应用程序的一个开源库。 [Electron](https://github.com/electron/electron) 通过将`Chromium`和`Node.js`合并到同一个运行时环境中，并将其打包为`Mac，Windows和Linux`系统下的应用来实现这一目的。

### 优势
先讲下优势，吸引一波
* Web 技术 - Electron 基于 Chromium 和 Node.js, 让你可以使用 HTML, CSS 和 JavaScript 构建应用。
* 跨平台 -  Mac、Windows 和 Linux
* 开源

### 上手前的知识储备
如果你是一名前端开发工程师，可以跳过这一小节。
* node 简单基础，会使用 npm
* 必要的 `HTML, CSS, JavaScript`

### 安装

### 官方 api demo 展示只需简单的三步
[Electron API](https://github.com/electron/electron-api-demos) 示例程序采用交互式界面展示了 Electron API 最关键的功能。通过代码样例和提示发掘 Electron 的无限可能，踏上你的开发之旅。
* 第一步，拉取代码
```
git clone https://github.com/electron/electron-api-demos
```
* 第二步，进入到 electron-api-demos 并安装依赖
```
cd electron-api-demos 
npm i
```
* 第三步，启动项目
```
npm start 
```
如果出现下面的界面就表示启动成功,我们可以查看它的源码，看下 api 怎么调用

![](https://user-gold-cdn.xitu.io/2019/9/26/16d6d0efabb08edb?w=1096&h=296&f=jpeg&s=56791)

![](https://user-gold-cdn.xitu.io/2019/9/26/16d6d0e33f5ab237?w=2146&h=1672&f=jpeg&s=242703)

### 自己上手 hello-word
基本的 `Electron` 应用程序仅需要以下文件：
* package.json - 指向应用程序的主文件，并列出其详细信息和依赖项。
* main.js - 启动应用程序并创建一个浏览器窗口以呈现HTML。这是应用程序的主要过程。
* index.html - 要呈现的网页。这是应用程序的渲染过程
接下来开始我们的 `hello word` 之行
* 第一步，新建项目目录和初始化
    ```
    mkdir hello-electron
    cd hello-electron
    npm init
    touch main.js
    touch index.html
    ```
    初始化成功
![](https://user-gold-cdn.xitu.io/2019/9/26/16d6d1e3e290c83d?w=926&h=1284&f=jpeg&s=163987)
    项目目录结构如下
    ```
    hello-electron
    ├─index.html //是一个web页面，它需要使用一个浏览器窗口（BrowserWindow）来加载和显示，作为应用的UI，它处在一个独立的渲染进程中。
    ├─main.js  //主进程
    ├─package-lock.json
    ├─render.js   //渲染进程 在此过程中，所有Node.js API均可用
    └package.json
    ```
* 第二步，安装 `electron` 依赖包- 这一步时间稍微有点久
    ```
    npm i --save electron
    ```
* 第三步，在`main.js`写代码
```
const { app, BrowserWindow } = require('electron')
const path = require('path')

let mainWindow

function createWindow() {
  // 新建一个窗口
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  // 加载主页
  mainWindow.loadFile('index.html')
  // 窗口关闭
  mainWindow.on('closed', function() {
    mainWindow = null
  })
}
// 当 Electron 完成初始化后触发，这里初始化后就会去创建浏览器窗口并加载主页面。
app.on('ready', createWindow)
// 当所有浏览器窗口被关闭后触发，一般此时就退出应用了
app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') app.quit()
})
// 当app激活时触发，一般针对macOS要需要处理。
app.on('activate', function() {
  if (mainWindow === null) createWindow()
})

```

* 第四步，运行项目
运行成功截图如下
![](https://user-gold-cdn.xitu.io/2019/9/26/16d6d34fd75af942?w=1576&h=1212&f=jpeg&s=68549)

赶紧试一试吧~

下一章节将开启 `Electron` 做一个简单的微信客户端

