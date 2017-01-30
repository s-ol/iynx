import React from 'react';

let rows = 'abcdefghijklmnopqrstuvwxyz'.split('');
const len = Math.floor(rows.length/3);
rows = [
  [...rows.slice(0, len), 'DEL'],
  rows.slice(len, rows.length - len, 'CLR'),
  [...rows.slice(-len, rows.length), 'RET'],
];

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      input: '',
      status: '',
    };
  }

  render() {
    const { input, status } = this.state;

    const append = key => () => {
      const { input, solved } = this.state;

      if (solved) return;

      if (key === 'RET') {
        const { secret, onReturn } = this.props;
        const fill = i => () =>
          this.setState({
            input: '*'.repeat(i) + input.slice(i, input.length)
          });

        if (input === secret) {
          setTimeout(fill(1),  400);
          setTimeout(fill(2),  800);
          setTimeout(fill(3), 1200);
          setTimeout(fill(4), 1600);
          setTimeout(onReturn, 1700);
        }

        this.setState({ status: input === secret ? 'solved' : 'error' });
        return;
      }

      let nextInput;
      if (key === 'DEL')
        nextInput = input.slice(0, input.length - 1);
      else if (key === 'CLR')
        nextInput = '';
      else
        nextInput = input + key;

      this.setState({ input: nextInput, status: '' });
    }

    return (
      <div className="login view">
        <div className="input box border">{input}</div>
        <div className={`keyboard border-trbl ${status}`}>
          {rows.map((row, index) =>
            <div key={index}>
              {row.map(key =>
                <div
                  key={key}
                  onClick={append(key)}
                  className="box"
                >
                  {key}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Login;
