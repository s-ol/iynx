import React from 'react';
import SerialPort from 'serialport';
import Readline from './lineparser';

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ-'.split('');

const Letter  = ({ children, offset }) => (
  <div
    style={{
      height: 40,
      fontSize: '3em',
//      transform: `perspective(400px) rotateX(${offset / alphabet.length * Math.PI * -2}rad)`,
      transition: 'transform 0.2s',
    }}
  >
    {children}
  </div>
);

const Wheel = ({ offset }) => {
  const charStyle = {
    height: 40,
    textAlign: 'center',
  };

  const fillers = 2;
  const extendedAlphabet = [
    ...alphabet.slice(alphabet.length - fillers - 1, alphabet.length - 1),
    ...alphabet,
    ...alphabet.slice(0, fillers),
  ];

  const centered = offset + fillers;

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
        top: centered * -40 + 52,
        transition: 'top 0.3s',
      }}>
        {extendedAlphabet.map(
          (character, index) => <Letter key={index} offset={index - centered}>{character}</Letter>
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
