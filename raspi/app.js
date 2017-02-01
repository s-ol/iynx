import React from 'react';
import ReactDOM from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { ipcRenderer } from 'electron';
import MenuButton from './menu';
import Login from './login';
import Welcome from './welcome';
import { Files, Preview, personalFiles, workFiles, galleryFiles } from './files';
import Cryptex from './cryptex';
import { exec } from 'child_process';

const debug = !!process.env.DEBUG;

const folders = {
  personal: personalFiles,
  work: workFiles,
  gallery: galleryFiles,
};

const play = name => () => new Audio(`sounds/${name}.wav`).play();

/*
let lastSet = [];

const playSounds = set =>  {
  lastSet.map(timeout => timeout && clearTimeout(timeout))
  times.keys().map(sound => {
    const timeout = times[sound] * 1000;
    return setTimeout(play(sound), timeout);
  });
}

const stages = {
  audio_restored: {

  },
  locked_file_accessed: {

  },
  wires_done: {
    // WIRES_DONE
    Puzzle5_IAmGoing: 0,
    OnHold_Music: 0, // @TODO
    Puzzle5_IAmGoing: 0,
    Puzzle5_IAmGoing: 0,
  },
  script_opened: {

  },
  number_entered: {

  },
  secret_activated: {

  },
  cryptex_start: {
    // CRYPTEX_START
    Puzzle6_Interesting: 0,
    Puzzle6_HaveYouForgotten: 20,
    Puzzle6_ComeOnJohn: 80,
  },
];

const progress = [
  'audio_restored',
  'locked_file_accessed',
  'wires_done',
  'script_opened',
  'number_entered',
  'secret_activated',
  'cryptex_start'
];

let lastIndex = 0;
const advanceTo = stage => {
  const i = progress.indexOf(stage);
  if (index < lastStage) return;
  playSounds(stages[stage]);
  lastStage = index;
};
*/

class App extends React.Component {
  constructor () {
    super();

    this.state = {
      cryptexSolved: false,
      binarySolved: false,
      wiringSolved: false,
      menuOpen: false,
      screen: 'welcome',
      fileIndex: null,
      sd: 'connected',
    };

    this.reset = () => this.setState({ screen: null });

    /*
    ipcRenderer.on('sd', (event, connected) => {
      const { sd } = this.state;

      if (!connected) this.setState({ sd: null });
      else if (!sd) this.setState({ sd: 'connected' });
    });
    */

    ipcRenderer.on('nano2', (event, { leds, wires, sd }) => {
      let nextSd = undefined;
      if (!sd) nextSd = null;
      else if (!this.state.sd) nextSd = 'connected';

      this.setState({
        wiringSolved: wires,
        binarySolved: leds === '01001101',
//        sd: nextSd,
      })
    });
  }

  componentDidMount() {
    window.app = this;
  }

  componentWillUpdate(props, { cryptexSolved }) {
  }

  getContent() {
    const {
      sd,
      screen,
      fileIndex,
      wiringSolved,
      binarySolved,
      menuOpen,
    } = this.state;

    if (!sd) {
      return (<h1>Enter Personality Chip</h1>);
    } else if (sd !== 'confirmed') {
      return (
        <Login
          key="login"
          secret="run"
          onDone={() => this.setState({ sd: 'confirmed' })}
        />
      );
    }

    if (fileIndex !== null && screen)
      return (
        <Preview
          {...folders[screen][fileIndex]}
          folder={screen}
          onReturn={() => this.setState({ fileIndex: null })}
        />
      );

    switch (screen) {
      case 'welcome':
        return (
          <Welcome
            key="welcome"
            onDone={() => {
              this.setState({ screen: null })
              // @TODO: audio?
            }}
          />
        );
      case 'personal':
      case 'work':
      case 'gallery':
        return <Files
          key={screen}
          title={screen}
          files={folders[screen]}
          onSelect={fileIndex => this.setState({ fileIndex })}
          onReturn={() => this.setState({ screen: null })}
        />;
      case 'system':
        return (
          <Cryptex
            key="system"
            secret="KATHERYN"
            onDone={() => this.setState({ screen: 'video' })}
            onReturn={() => this.setState({ screen: null })}
          />
        );
      case 'video':
        return (
          <video
            key="video"
            className="menu"
            src="sounds/end.mp4"
            onEnded={() => exec(debug ? 'echo shutdown > ./test' : 'sudo shutdown -h now')}
            autoPlay
          />
        );
    }

    return (
      <div key="menu" className="menu view">
        <h1 className="title">IYNX</h1>
        <ReactCSSTransitionGroup
          transitionName="menu"
          transitionEnterTimeout={1300}
          transitionLeaveTimeout={400}
        >
          <MenuButton
            key="iynx"
            title="iynx"
            style={{ left: 56, top: 319, opacity: menuOpen && 0.7 }}
            disabled={menuOpen}
            onClick={() => this.setState({ menuOpen: !this.state.menuOpen })}
          />
          {menuOpen && [
            (<MenuButton
              key="system"
              title="system"
              style={{ left: 134, top: 274 }}
              onClick={() => this.setState({ screen: 'system' })}
              disabled={!binarySolved}
            />),
            (<MenuButton
              key="gallery"
              title="gallery"
              style={{
                left: 212,
                top: 229,
                transitionDelay: '200ms',
              }}
              onClick={() => this.setState({ screen: 'gallery' })}
            />),
            (<MenuButton
              key="personal"
              title="personal"
              style={{
                left: 290,
                top: 184,
                transitionDelay: '400ms',
              }}
              onClick={() => this.setState({ screen: 'personal' })}
            />),
            (<MenuButton
              key="work"
              title="work"
              style={{
                left: 290,
                top: 274,
                transitionDelay: '600ms',
              }}
              onClick={() => this.setState({ screen: 'work' })}
              disabled={true || !wiringSolved}
            />),
          ]}
        </ReactCSSTransitionGroup>
      </div>
    );
  }

  render() {
    return (
      <ReactCSSTransitionGroup
        transitionName="anim"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}
      >
        {this.getContent()}
      </ReactCSSTransitionGroup>
    );
  }
}

window.onload = () => {
  if (!process.env.DEBUG) document.body.style.cursor = 'none';
  ReactDOM.render(<App />, document.getElementById('view'));
}
