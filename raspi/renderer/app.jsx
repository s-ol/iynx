import React from 'react';
import SerialPort from 'serialport';
import Readline from './lineparser';

const Slider = ({ value }) => (
  <div style={{
    position: 'relative',
    display: 'inline-block',
    width: 40,
    height: 150,
    margin: 5,
    border: '1px solid #000',
  }}>
    <div style={{
      position: 'absolute',
      background: value === null ? '#aaa' :  '#f00',
      width: '100%',
      height: value === null ? '100%' : `${value * 100}%`,
      bottom: 0,
      transition: 'background-color 0.3s, height 0.2s',
    }}>
    </div>
  </div>
);

const clamp = (val, min=0, max=1) => Math.max(min, Math.min(max, val));

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sliders: [null, null, null, null, null, null, null, null, null, null],
      security: false,
      wires: false,
    };

    /*
    const st = fs.createReadStream('/dev/ttyUSB0', { encoding: 'ASCII' });
    st.on('data', a => console.info(a));
    this.stream = byline(st);
    this.stream.on('data', line => {
    */
    const port = new SerialPort('/dev/ttyUSB0', { baudRate: 115200 });
    console.log(SerialPort.parsers);
    const parser = new Readline();
    port.pipe(parser);
    parser.on('data', line => {
      const parts = line.split(' ');
      this.setState({
        security: parts[0] === '1' ? true : false,
        wires: parts[1] === '1' ? true : false,
        sliders: parts.slice(2, 10).map(n => clamp(parseInt(n) / 880)),
      });
    });
  }

  render() {
    const { sliders } = this.state;

    return (
      <div>
        <h1>Hello World!</h1>
        We are using node {process.versions.node},
        Chrome {process.versions.chrome},
        and Electron {process.versions.electron}.
        <div>
          {sliders.map((value, index) => <Slider key={index} value={value} />)}
        </div>
      </div>
    );
  }
};
