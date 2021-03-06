import React from 'react';
import Typist from 'react-typist';
import { ipcRenderer } from 'electron';

const none = { show: false };

class Welcome extends React.PureComponent {
  constructor(props) {
    super(props);

    const { onDone } = this.props;

    this.state = {
      sliders: [ '', '', '', '', '', '', '', '' ],
    };

    ipcRenderer.once('calibration', () => {
      new Audio(`sounds/${name}.wav`).play();
      ipcRenderer.on('nano2', (event, { sliders }) => {
        const nextSliders = sliders.map((val, index) => {
          let old = this.state.sliders[index];
          if (val <= 0.06 && !old.startsWith('0'))
            old = '0' + old;
          if (val >= 0.94 && !old.endsWith('1'))
            old = old + '1';
          return old;
        });
        if (nextSliders.join(',') !== this.state.sliders.join(','))
	  this.setState({ sliders: nextSliders });
      });
    });
  }

  componentDidUpdate() {
    const { onDone } = this.props;
    const { sliders } = this.state;

    ipcRenderer.send('audio', sliders.map((val, index) =>
      val === '01' ? String(8-index) : ''
    ).join(''));

    if (sliders.every(val => val === '01')) {
      ipcRenderer.send('audio', 'D');
      onDone();
    }
  }

  render () {
    return (
    <div className="view" style={{fontSize: '1.3em' }}>
      <Typist cursor={none}>
        <p>
          Welcome back John<br/>
          :)
        </p>
      </Typist>
      <Typist startDelay={5000} cursor={none}>
        <p>
          I hope you had a pleasant trip.<br/>
          It seems like my systems have been tampered with since you were away on a beautiful holiday.
        </p>
      </Typist>
      <Typist startDelay={15000} cursor={none}>
        <p>
          My speech capabilities seem to be malfunctioning.
        </p>
      </Typist>
      <Typist startDelay={35000} cursor={none}>
        <p>
          It seems like you must utilize the slider controls on the other panel to repair my speech. Didn’t you know that?
        </p>
      </Typist>
    </div>
  );
  }
}

export default Welcome;
