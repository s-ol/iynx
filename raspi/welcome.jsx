import React from 'react';
import Typist from 'react-typist';
import { ipcRenderer } from 'electron';

const none = { show: false };

class Welcome extends React.Component {
  constructor(props) {
    super(props);

    const { onDone } = this.props;

    this.state = {
      sliders: [ '', '', '', '', '', '', '', '' ],
    };

    ipcRenderer.once('calibration', ()=> {
      ipcRenderer.on('nano2', (event, { sliders }) => {
        const nextSliders = sliders.map((val, index) => {
          let old = this.state.sliders[index];
          if (val <= 0.01 && !old.startsWith('0'))
            old = '0' + old;
          if (val >= 0.99 && !old.endsWith('1'))
            old = old + '1';
          return old;
        });
        ipcRenderer.send('debug', nextSliders.join(',') !== this.state.sliders.join(','));
        if (nextSliders.join(',') !== this.state.sliders.join(','))
	  this.setState({ sliders: newSliders });
      });
    });
  }

  shouldComponentUpdate({ onDone }, { sliders }) {
    ipcRenderer.send('debug', props.onDone !== this.props.onDone || sliders !== this.state.sliders);
    return props.onDone !== this.props.onDone || sliders !== this.state.sliders;
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
    <div className="view">
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
      <Typist startDelay={30000} cursor={none}>
        <p>
          My speech capabilities seem to be malfunctioning.
        </p>
      </Typist>
      <Typist startDelay={60000} cursor={none}>
        <p>
          It seems like you must utilize the slider controls on the other panel to repair my speech. Didn’t you know that?
        </p>
      </Typist>
    </div>
  );
  }
}

export default Welcome;
