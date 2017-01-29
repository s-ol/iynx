import { Readable, PassThrough } from 'stream';
import fs from 'fs';
import { Reader as WAVDecoder} from 'wav';

export const decode = filename => new Promise((resolve, reject) => {
  const decoder = new WAVDecoder()
  .on('format', format => resolve(decoder))
  .on('error', err => reject(err));
  fs.createReadStream(filename).pipe(decoder);
});

export class Queue extends Readable {
  constructor() {
    super();
    this.current = null;
    this.queue = [];
    this._end = () => this.current = this.queue.shift();
  }

  static to(stream) {
    const queue = new this();
    queue.pipe(stream);
    return queue;
  }

  append(stream) {
    stream.on('end', this._end);
    if (!this.current) this.current = stream;
    else this.queue.push(stream);
  }

  playing() {
    return this.queue.current;
  }

  clear() {
    this.current = null;
    this.queue.length = 0;
  }

  truncate() {
    this.queue.length = 0;
  }

  _read(size) {
    console.log(this.current);
    while (
      this.push(this.current
        ? this.current.read(size)
        : Buffer.alloc(size)
      )
    );
  }
};

export class TemporaryStream extends PassThrough {
  constructor(timeout) {
    super();

    this.timeout = setTimeout(() => {
      this.end();
      console.log('end');
    }, timeout);
  }

  _read() {
    clearTimeout(this.timeout);
    this._read = super._read;
    return this._read(...arguments);
  }
};
