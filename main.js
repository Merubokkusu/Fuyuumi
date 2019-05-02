const {app, BrowserWindow,ipcMain} = require('electron')

function createWindow () {
    window = new BrowserWindow({
        width: 800, 
        height: 600,
        resizable: false,
        frame:false,
        webPreferences: {
            webSecurity: false
        }
    })
    
    window.loadFile('index.html')
    window.webContents.openDevTools()
  }


  app.on('ready', createWindow)
  app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit()
    }
})

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
