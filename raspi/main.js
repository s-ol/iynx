import { app, BrowserWindow } from 'electron';
import SerialPort from 'serialport';
import Readline from './lineparser';
import path from 'path';
import url from 'url';
import fs from 'fs';
import config from './config';

const debug = !!process.env.DEBUG;
let win, nano1, nano2;

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
  win.webContents.on('debug', (event, data) => console.log(data));
  win.webContents.on('audio', (event, { msg }) => {
    if (nano1) nano1.send(msg)
    console.log('nano1', msg);
  });

  win.once('ready-to-show', () => {
    win.setKiosk(!debug);
    win.show()
  });
  win.once('closed', () => { win = null });
})
.on('window-all-closed', () => app.quit());

const clamp = (val, min=0, max=1) => Math.max(min, Math.min(max, val));

SerialPort.list((err, list) => {
  list.forEach(({ comName, serialNumber }) => {
    if (serialNumber === config.nano1) {
      nano1 = new SerialPort(comName, { baudRate: 115200 });
      nano1.pipe(
        new Readline()
        .on('data', line => {
          if (!win) return;

          if (line.startsWith('calibstart'))
            win.webContents.send('nano1', { calibration: true });
        })
      );
    } else if (serialNumber === config.nano2) {
      nano2 = new SerialPort(comName, { baudRate: 115200 });
      nano2.pipe(
        new Readline()
        .on('data', line => {
          if (!win) return;

          const parts = line.split(' ');
          win.webContents.send('nano2', {
            security: parts[0] === '1' ? true : false,
            sd: parts[0] === '1' ? true : false,
            wires: parts[1] === '1' ? true : false,
            sliders: parts.slice(2, 10).map(n => clamp(parseInt(n) / 1024)),
            leds: parts.slice(10, 18).join(''),
          });
        })
      );
    }
  });
});

/*
setInterval(
  () => win && win.webContents.send(
    'sd',
    fs.existsSync(config.sd) || config.skipSD
  ),
  500
);
*/
