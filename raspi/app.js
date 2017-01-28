import React from 'react';
import ReactDOM from 'react-dom';
import Cryptex from './cryptex';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      solved: false,
    };
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
