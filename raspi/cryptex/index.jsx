import React from 'react';
import { ipcRenderer } from 'electron';
import memoize from 'memoization';
import MenuButton from '../menu';

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ-'.split('');

const fillers = 2;
const extendedAlphabet = [
  ...alphabet.slice(alphabet.length - fillers - 1, alphabet.length - 1),
  ...alphabet,
  ...alphabet.slice(0, fillers),
];

const Wheel = memoize(({ offset }) => {
  const centered = offset + fillers;

  return (
    <div className="wheel">
      <div style={{
        position: 'absolute',
        display: 'flex',
        flexFlow: 'column nowrap',
        width: '100%',
        top: centered * -40 + 52,
        transition: 'top 0.3s',
      }}>
        {extendedAlphabet.map((character, index) =>
          <div key={index} className="letter">{character}</div>
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
    };

    ipcRenderer.on('nano2', (event, { sliders }) => {
      sliders = sliders.map(i => Math.floor(i * alphabet.length));
      this.setState({ sliders });
      if (sliders.map(i => alphabet[i]).join('') === secret)
        onDone();
    });
  }

  render() {
    const { onReturn } = this.props;
    const { sliders } = this.state;

    return (
      <div className="cryptex view">
        <div className="box border">
          {sliders.map((value, index) => <Wheel key={index} offset={value} />)}
          <div className="visor box border-trbl" />
        </div>
        <MenuButton
          onClick={onReturn}
          title="iynx"
          style={{ left: 656, top: 319 }}
        />
      </div>
    );
  }
};

Cryptex.propTypes = {
  secret: React.PropTypes.string,
  onChanged: React.PropTypes.func,
  onReturn: React.PropTypes.func,
};

export default Cryptex;
