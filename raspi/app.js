import React from 'react';
import ReactDOM from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { ipcRenderer } from 'electron';
import MenuButton from './menu';
import Login from './login';
import Cryptex from './cryptex';
import { Files, Preview, personalFiles, workFiles, galleryFiles } from './files';
// import { decode, TemporaryStream, Queue } from './audio';
// import Speaker from 'speaker';

// const audio = Queue.to(new Speaker());

const folders = {
  personal: personalFiles,
  work: workFiles,
  gallery: galleryFiles,
};

class App extends React.Component {
  constructor () {
    super();

    this.state = {
      solved: false,
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
  }

  componentWillUpdate(props, { solved }) {
    // if (solved && !this.state.solved)
    //  decode('piano2.wav').then(stream => audio.append(stream.pipe(new TemporaryStream(200))));
  }

  getContent() {
    const { sd, screen, fileIndex } = this.state;

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
            onChanged={solved => this.setState({ solved })}
            onReturn={() => this.setState({ screen: null, fileIndex: null })}
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
          onReturn={() => this.setState({ screen: null, fileIndex: null })}
        />;
    }

    return (
      <div key="menu" className="menu view">
        <h1 className="title">IYNX</h1>
        <MenuButton
          title="iynx"
          left={56}
          top={319}
        />
        <MenuButton
          onClick={() => this.setState({ screen: 'system' })}
          title="system"
          left={134}
          top={274}
        />
        <MenuButton
          onClick={() => this.setState({ screen: 'gallery' })}
          title="gallery"
          left={212}
          top={229}
        />
        <MenuButton
          onClick={() => this.setState({ screen: 'personal' })}
          title="personal"
          left={290}
          top={184}
        />
        <MenuButton
          onClick={() => this.setState({ screen: 'work' })}
          title="work"
          left={290}
          top={274}
        />
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

window.onload = () =>
  ReactDOM.render(<App />, document.getElementById('view'));
