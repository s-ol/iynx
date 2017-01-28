import { Transform } from 'stream';

export default class LineParser extends Transform {
  constructor(options) {
    options = options || {};

    super(options);

    this.delimiter = new Buffer('\n', 'utf8');
    this.buffer = new Buffer(0);
    this.setEncoding('utf8');
  }

  _transform(chunk, encoding, cb) {
    let data = Buffer.concat([this.buffer, chunk]);
    let position;
    while ((position = data.indexOf(this.delimiter)) !== -1) {
          this.push(data.slice(0, position));
          data = data.slice(position + this.delimiter.length);
        }
    this.buffer = data;
    cb();
  }

  _flush(cb) {
    this.push(this.buffer);
    this.buffer = new Buffer(0);
    cb();
  }
};
