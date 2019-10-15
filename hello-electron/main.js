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
