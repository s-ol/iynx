import React from 'react';
import { ipcRenderer } from 'electron';
import memoize from 'memoization';

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ-'.split('');

const Letter  = memoize(({ children, offset }) => (
  <div
    style={{
      height: 40,
      fontSize: '3em',
      transition: 'transform 0.2s',
    }}
  >
    {children}
  </div>
));


const fillers = 2;
const extendedAlphabet = [
...alphabet.slice(alphabet.length - fillers - 1, alphabet.length - 1),
...alphabet,
...alphabet.slice(0, fillers),
];

const Wheel = memoize(({ offset }) => {
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
});

Wheel.propTypes = {
  offset: React.PropTypes.number,
};

class Cryptex extends React.Component {
  constructor(props) {
    super(props);

    const { secret, onChanged } = this.props;

    this.state = {
      sliders: [null, null, null, null, null, null, null, null, null, null],
      security: false,
      wires: false,
    };

    ipcRenderer.on('nano2', (event, { sliders, security, wires }) => {
      this.setState({
        sliders: sliders.map(i => Math.floor(i * alphabet.length)),
        security,
        wires,
      });

      if (onChanged)
        onChanged(sliders.map(i => alphabet[i]).join('') === secret);
    });
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
  onChanged: React.PropTypes.func,
};

export default Cryptex;
