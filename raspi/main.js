import { app, BrowserWindow } from 'electron';
import SerialPort from 'serialport';
import Readline from './lineparser';
import path from 'path';
import url from 'url';
import fs from 'fs';

const debug = !!process.env.DEBUG;
let win;

app
.on('ready', () => {
  win = new BrowserWindow({
    width: 800,
    height: 480,
    title: 'IYNX',
    resizeable: false,
    show: false,
  });

  win.setMenu(null);

  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));

  if (debug) win.webContents.openDevTools();

  win.once('ready-to-show', () => {
    win.setKiosk(!debug);
    win.show()
  });
  win.once('closed', () => { win = null });
})
.on('window-all-closed', () => app.quit());

const clamp = (val, min=0, max=1) => Math.max(min, Math.min(max, val));

new SerialPort('/dev/ttyUSB0', { baudRate: 115200 })
.pipe(
  new Readline()
  .on('data', line => {
    if (!win) return;

    const parts = line.split(' ');
    win.webContents.send('nano2', {
      security: parts[0] === '1' ? true : false,
      wires: parts[1] === '1' ? true : false,
      sliders: parts.slice(2, 10).map(n => clamp(parseInt(n) / 1024)),
    });
  })
);

setInterval(
  () => win && win.webContents.send('sd', fs.existsSync('/dev/sdc1')),
  500
);
