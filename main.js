const {app, BrowserWindow} = require('electron')

let mainWindow

function createWindow() {
  // 创建浏览器窗口
  mainWindow = new BrowserWindow({
    show: false,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // 窗口最大化
  mainWindow.maximize()

  // 并且为你的应用加载index.html
  mainWindow.loadFile('index.html')

  // 打开开发者工具
  mainWindow.webContents.openDevTools()
  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })
}

// Electron会在初始化完成并且准备好创建浏览器窗口时调用这个方法, 部分API在ready事件触发后才能使用
app.whenReady().then(() => {
  createWindow()
})



// 当所有窗口都被关闭后退出
app.on('window-all-closed', () => {
  // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，否则绝大部分应用及其菜单栏会保持激活
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // 在macOS上，当单击dock图标并且没有其他窗口打开时，通常在应用程序中重新创建一个窗口
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
