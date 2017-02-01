import React from 'react';
import ReactDOM from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { ipcRenderer } from 'electron';
import MenuButton from './menu';
import Login from './login';
import Cryptex from './cryptex';
import { Files, Preview, personalFiles, workFiles, galleryFiles } from './files';

const folders = {
  personal: personalFiles,
  work: workFiles,
  gallery: galleryFiles,
};

class App extends React.Component {
  constructor () {
    super();

    this.state = {
      cryptexSolved: false,
      binarySolved: false,
      wiringSolved: false,
      menuOpen: false,
      screen: null,
      fileIndex: null,
      sd: null,
    };

    this.reset = () => this.setState({ screen: null });

    ipcRenderer.on('sd', (event, connected) => {
      const { sd } = this.state;

      if (!connected) this.setState({ sd: null });
      else if (!sd) this.setState({ sd: 'connected' });
    });

    ipcRenderer.on('nano2', (event, { leds, wires }) => {
      console.log( leds );
      this.setState({
        wiringSolved: wires,
        binarySolved: leds === '01001101',
      })
    });

    ipcRenderer.on('nano1', calibrating => this.setState({ calibrating }));
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
          secret="abcd"
          onReturn={() => this.setState({ sd: 'confirmed' })}
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
      case 'system':
        return (
          <Cryptex
            key="system"
            secret="HELP--ME"
            onChanged={cryptexSolved => this.setState({ cryptexSolved })}
            onReturn={() => this.setState({ screen: null })}
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
              disabled={!wiringSolved}
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
