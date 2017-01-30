import React from 'react';
import ReactDOM from 'react-dom';
import Cryptex from './cryptex';
import { Files, personalFiles, workFiles, galleryFiles } from './files';
// import { decode, TemporaryStream, Queue } from './audio';
// import Speaker from 'speaker';

// const audio = Queue.to(new Speaker());

class App extends React.Component {
  constructor () {
    super();
    this.state = {
      solved: false,
      screen: 'menu',
    };
  }

  componentWillUpdate(props, { solved }) {
    // if (solved && !this.state.solved)
    //  decode('piano2.wav').then(stream => audio.append(stream.pipe(new TemporaryStream(200))));
  }

  render() {
    const { screen } = this.state;

    let content = null;
    switch (screen) {
      case 'menu':
        return (
          <div>
            <div onClick={() => this.setState({ screen: 'system' })}>system</div>
            <div onClick={() => this.setState({ screen: 'personal' })}>personal</div>
            <div onClick={() => this.setState({ screen: 'work' })}>work</div>
            <div onClick={() => this.setState({ screen: 'gallery' })}>gallery</div>
          </div>
        );
      case 'system':
        return (
          <Cryptex
            secret="HELP--ME"
            onChanged={solved => this.setState({ solved })}
          />
        );
      case 'personal':
        return <Files title="personal" files={personalFiles} />;
      case 'work':
        return <Files title="work" files={workFiles} />;
      case 'gallery':
        return <Files title="gallery" files={galleryFiles} />;
    }

    return (
      <div>
        {content}
      </div>
    );
  }
}

window.onload = () =>
  ReactDOM.render(<App />, document.getElementById('view'));
