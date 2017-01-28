import React from 'react';
import SerialPort from 'serialport';
import Readline from './lineparser';

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ-';

const CryptexWheel = ({ offset }) => {
  const charStyle = {
    height: 40,
    textAlign: 'center',
  };

  return (
    <div style={{
      position: 'relative',
      display: 'inline-block',
      width: 40,
      height: 150,
      margin: 10,
      border: '1px solid #000',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute',
        display: 'flex',
        flexFlow: 'column nowrap',
        width: '100%',
        marginTop: 52 - 3*40,
        top: offset * -40,
        transition: 'top 0.3s',
        fontSize: '3em',
      }}>
        <div style={charStyle}>X</div>
        <div style={charStyle}>Y</div>
        <div style={charStyle}>Z</div>
        {alphabet.split('').map(c =>
          <div
            key={c}
            style={charStyle}
          >
            {c}
          </div>
        )}
        <div style={charStyle}>A</div>
        <div style={charStyle}>B</div>
        <div style={charStyle}>C</div>
      </div>
    </div>
  )
};

const clamp = (val, min=0, max=1) => Math.max(min, Math.min(max, val));

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sliders: [null, null, null, null, null, null, null, null, null, null],
      security: false,
      wires: false,
    };

    const port = new SerialPort('/dev/ttyUSB0', { baudRate: 115200 });
    const parser = new Readline();
    parser.on('data', line => {
      const parts = line.split(' ');
      this.setState({
        security: parts[0] === '1' ? true : false,
        wires: parts[1] === '1' ? true : false,
        sliders: parts.slice(2, 10).map(
          n => Math.floor(clamp(parseInt(n) / 880) * alphabet.length),
        ),
      });
    });
    port.pipe(parser);
  }

  render() {
    const { sliders } = this.state;

    return (
      <div>
        <h1>IYNX</h1>
        <div style={{
          position: 'relative',
          display: 'inline-block',
        }}>
          <div style={{
            position: 'absolute',
            top: '50%',
            left: 0,
            right: 0,
            height: 46,
            marginTop: -23,
            border: '4px solid #888',
          }}>
          </div>
          {sliders.map((value, index) => <CryptexWheel key={index} offset={value} />)}
        </div>
      </div>
    );
  }
};
