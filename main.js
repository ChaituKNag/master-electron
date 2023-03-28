// Modules
const {app, BrowserWindow} = require('electron')
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.

console.log('Checking ready ' + app.isReady());

let mainWindow, secondaryWindow

// Create a new BrowserWindow when `app` is ready
function createWindow () {
  
  mainWindow = new BrowserWindow({
    width: 1000, height: 800,
    webPreferences: { nodeIntegration: true },
    backgroundColor: "#2B2E3B",
    titleBarStyle: "hidden",
    resizable: false
    // frame: false
  })
  
  // Load index.html into the new BrowserWindow
  mainWindow.loadFile('index.html')

  let wc = mainWindow.webContents

  wc.on('media-started-playing', () => {
    console.log('Video started playing');
  })

  wc.on('media-paused', () => console.log('Video paused now'))

  wc.on('context-menu', (e, params) => {
    // console.log(`context menu opened on ${params.mediaType} at ${params.x}, ${params.y}`);
    console.log('User selection: ', params.selectionText);
    console.log('Selection can be copied: ', params.editFlags.canCopy);
  })

  mainWindow.on('closed',  () => {
    mainWindow = null
  })
}

// Electron `app` is ready
app.on('ready', () => {
  console.log('App is ready');
  createWindow();
  console.log(app.getPath('desktop'))
  console.log(app.getPath('music'))
  console.log(app.getPath('temp'))
  console.log(app.getPath('userData'))
})

// Quit when all windows are closed - (Not macOS - Darwin)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// When app icon is clicked and app is running, (macOS) recreate the BrowserWindow
app.on('activate', () => {
  if (mainWindow === null) createWindow()
})
