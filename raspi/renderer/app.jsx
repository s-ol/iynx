import React from 'react';
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
            onSolved={() => this.setState({ solved: true })}
          />
        </div>
      </div>
    );
  }
}

export default App;
