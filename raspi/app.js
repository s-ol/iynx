import React from 'react';
import ReactDOM from 'react-dom';
import Cryptex from './cryptex';
import { decode, TemporaryStream, Queue } from './audio';
import Speaker from 'speaker';

const audio = Queue.to(new Speaker());

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      solved: false,
    };
  }

  componentWillUpdate(props, { solved }) {
    if (solved && !this.state.solved)
      decode('piano2.wav').then(stream => audio.append(stream.pipe(new TemporaryStream(200))));
  }

  render() {
    const { solved } = this.state;

    return (
      <div>
        <h1>IYNX</h1>
        {solved && 'thanks man'}
        <div>
          <Cryptex
            secret="HELP--ME"
            onChanged={solved => this.setState({ solved })}
          />
        </div>
      </div>
    );
  }
}

window.onload = () => ReactDOM.render(<App />, document.getElementById('view'));
