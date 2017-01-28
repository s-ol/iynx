const { app, BrowserWindow } = require('electron');
const path =  require('path');
const url =  require('url');

const debug = !!process.env.DEBUG;
let win;

app.on('ready', () => {
  win = new BrowserWindow({
    width: 800,
    height: 480,
    title: 'IYNX',
    resizeable: false,
    kiosk: !debug
  });

  win.setMenu(null);

  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));

  if (debug) win.webContents.openDevTools();

  win.on('closed', () => { win = null });
});

app.on('window-all-closed', () => {
  app.quit();
});
