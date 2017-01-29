import React from 'react';
import ReactDOM from 'react-dom';
import Cryptex from './cryptex';
// import { decode, TemporaryStream, Queue } from './audio';
// import Speaker from 'speaker';

// const audio = Queue.to(new Speaker());

const Files = () => (<div>Files</div>);

class App extends React.Component {
  constructor () {
    super();
    this.state = {
      solved: false,
      screen: 'personal',
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
      case 'system':
        content = (
          <Cryptex
            secret="HELP--ME"
            onChanged={solved => this.setState({ solved })}
          />
        );
        break;
      case 'personal':
        return (
          <Files />
        );
        break;
      case 'work':
        break;
      case 'gallery':
        break;
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
