const fs = require('fs');

const parseLine = filename => new Promise((resolve, reject) => {
  const stream = fs.createReadStream(filename);
  let line = '';
  let pos = 0;
  let index;
  stream
    .on('data', (chunk) => {
              index = chunk.indexOf('\n');
              line += chunk;
              index !== -1 ? stream.close() : pos += chunk.length;
            })
    .on('close', () => resolve(line.slice(0, pos + index)))
    .on('error', err => reject(err));
});

const parse = string => new Promise(resolve => {
  const parts = string.split(' ');
  console.log(string);
  resolve({
    security: parts[0] === '1' ? true : false,
    wires: parts[1] === '1' ? true : false,
    sliders: parts.slice(2, 8).map(n => parseInt(n) / 1024),
  });
});

parseLine('/dev/ttyUSB0')
  .then(parse)
  .then(msg => console.log(msg));
