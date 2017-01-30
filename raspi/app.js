import React from 'react';
import ReactDOM from 'react-dom';
import Cryptex from './cryptex';
import { Files, personalFiles, workFiles, galleryFiles } from './files';
// import { decode, TemporaryStream, Queue } from './audio';
// import Speaker from 'speaker';

// const audio = Queue.to(new Speaker());

const MenuButton = ({ title, icon, top, left, onClick }) => (
  <div className="menu-btn" style={{ top, left }}>
    <img src={`files/icons/${title}.png`} />
    <div onClick={onClick} />
    <div onClick={onClick} className="l" />
    <div onClick={onClick} className="r" />
  </div>
);

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
            <h1 className="title">IYNX</h1>
            <MenuButton
              title="iynx"
              left={66}
              top={335}
            />
            <MenuButton
              onClick={() => this.setState({ screen: 'system' })}
              title="system"
              left={144}
              top={290}
            />
            <MenuButton
              onClick={() => this.setState({ screen: 'gallery' })}
              title="gallery"
              left={222}
              top={245}
            />
            <MenuButton
              onClick={() => this.setState({ screen: 'personal' })}
              title="personal"
              left={300}
              top={200}
            />
            <MenuButton
              onClick={() => this.setState({ screen: 'work' })}
              title="work"
              left={300}
              top={290}
            />
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
