import React from 'react';
import SerialPort from 'serialport';
import Readline from './lineparser';

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ-'.split('');

const color = 'fdb975'.split('').map(a => `#${a.repeat(6)}`);
const Letter  = ({ children, offset }) => (
  <div
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 48,
      fontSize: '3em',
      textAlign: 'center',
      transform: `perspective(400px) translateZ(200px) rotateX(${offset / alphabet.length * Math.PI * 2}rad) translateZ(-200px) translateY(-50%)`,
      opacity: Math.abs(offset) < 8 ? 1 : 0,
      transition: 'transform 1.3s, opacity 1.3s, background 1.3s',
      background: color[offset + 3],
    }}
  offset={offset}
  >
    {children}
  </div>
);

const raddiff = (index, offset) => {
  const diff = index - offset;
  const opp = alphabet.length - Math.abs(diff);
  return Math.abs(diff) < Math.abs(opp) ? diff : Math.sign(diff) * -opp;
}

const Wheel = ({ offset }) => {
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
        top: 75, // - 40/2,
        width: '100%',
        height: 40,
//        transform: `perspective(400px) rotateX(${offset / alphabet.length * Math.PI * -2}rad)`,
        transition: 'transform 0.3s',
      }}>
        {alphabet.map(
          (character, index) => <Letter key={index} offset={raddiff(index, offset)}>{character}</Letter>
        )}
      </div>
    </div>
  )
};

Wheel.propTypes = {
  offset: React.PropTypes.number,
};

const clamp = (val, min=0, max=1) => Math.max(min, Math.min(max, val));

class Cryptex extends React.Component {
  constructor(props) {
    super(props);

    const { secret, onSolved } = this.props;

    this.state = {
      sliders: [null, null, null, null, null, null, null, null, null, null],
      security: false,
      wires: false,
    };

    const port = new SerialPort('/dev/ttyUSB0', { baudRate: 115200 });
    const parser = new Readline();
    parser.on('data', line => {
      const parts = line.split(' ');
      const sliders = parts.slice(2, 10).map(
        n => Math.floor(clamp(parseInt(n) / 880) * alphabet.length),
      );
      this.setState({
        security: parts[0] === '1' ? true : false,
        wires: parts[1] === '1' ? true : false,
        sliders,
      });

      if (onSolved && sliders.map(i => alphabet[i]).join('') === secret)
        onSolved();
    });
    port.pipe(parser);
  }

  render() {
    const { sliders } = this.state;

    return (
      <div style={{
        position: 'relative',
        display: 'inline-block',
      }}>
        {sliders.map((value, index) => <Wheel key={index} offset={value} />)}
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
      </div>
    );
  }
};

Cryptex.propTypes = {
  secret: React.PropTypes.string,
  onSolved: React.PropTypes.func,
};

export default Cryptex;
