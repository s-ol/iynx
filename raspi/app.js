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

const error = () => play(`Error_Audio${Math.floor(Math.random()*4)}`);
const blip = () => play(`Audio_Interface${Math.floor(Math.random()*5)}`);
const play = name => () => new Audio(`sounds/${name}.wav`).play();

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
    Puzzle3_WellDoneJohn: 0,
    Puzzle3_IHaveMissed: 5,
    Puzzle5_IAmGoing: 15,
    OnHold_Music: 20,
    Puzzle5_AllPermissionsAppear: 36,
    Puzzle5_IWillRequire: 47,
    Puzzle5_IWillRequire: 87,
  },
  binary_solved: {
    Puzzle6_Remarkable: 0,
  },
  cryptex_start: {
    Puzzle6_Interesting: 0,
    Puzzle6_HaveYouForgotten: 20,
    Puzzle6_ComeOnJohn: 80,
  },
};

const progress = [
  'audio_restored',
  'binary_solved',
  'cryptex_start'
];

let lastIndex = 0;
const advanceTo = stage => {
  const i = progress.indexOf(stage);
  if (index <= lastStage) return;
  playSounds(stages[stage]);
  lastStage = index;
};

class App extends React.PureComponent {
  constructor () {
    super();

    this.state = {
      cryptexSolved: false,
      binarySolved: false,
      menuOpen: false,
      screen: 'welcome',
      fileIndex: null,
      sd: 'connected',
    };

    this.reset = () => this.setState({ screen: null });

    ipcRenderer.on('nano2', (event, { leds }) => {
      this.setState({
        binarySolved: leds === '01001101',
      })
    });
  }

  componentDidMount() {
    window.app = this;
  }

  getContent() {
    const {
      sd,
      screen,
      fileIndex,
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
          onDone={() => {
            blip();
            this.setState({ sd: 'confirmed' });
          }}
        />
      );
    }

    if (fileIndex !== null && screen)
      return (
        <Preview
          {...folders[screen][fileIndex]}
          folder={screen}
          onReturn={() => {
            this.setState({ fileIndex: null });
            blip();
          }}
        />
      );

    switch (screen) {
      case 'welcome':
        return (
          <Welcome
            key="welcome"
            onDone={() => {
              this.setState({ screen: null })
              blip();
              advanceTo('audio_restored');
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
          onReturn={() => {
            blip();
            this.setState({ screen: null });
          }}
        />;
      case 'system':
        return (
          <Cryptex
            key="system"
            secret="KATHERYN"
            onDone={() => this.setState({ screen: 'video' })}
            onReturn={() => {
              this.setState({ screen: null });
              blip();
            }}
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
            onClick={() => {
              blip();
              this.setState({ menuOpen: !this.state.menuOpen });
            }}
          />
          {menuOpen && [
            (<MenuButton
              key="system"
              title="system"
              style={{ left: 134, top: 274 }}
              onClick={() => {
                advanceTo('cryptex_start');
                blip();
                this.setState({ screen: 'system' });
              }}
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
              onClick={() => {
                blip();
                this.setState({ screen: 'gallery' });
              }}
              disabled
            />),
            (<MenuButton
              key="personal"
              title="personal"
              style={{
                left: 290,
                top: 184,
                transitionDelay: '400ms',
              }}
              onClick={() => {
                blip();
                this.setState({ screen: 'personal' })
              }}
            />),
            (<MenuButton
              key="work"
              title="work"
              style={{
                left: 290,
                top: 274,
                transitionDelay: '600ms',
              }}
              onClick={() => {
                blip();
                this.setState({ screen: 'work' });
              }}
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
