import React from 'react';
import _personalFiles from './personalFiles';
import workFiles from './personalFiles';
import galleryFiles from './galleryFiles';

export * from './workFiles';
export * from './personalFiles';
export * from './galleryFiles';

export class Files extends React.Component {
  constructor() {
    super();
    this.state = {
      selection: null,
    };
  }

  render() {
    const {
      title,
      files,
    } = this.props;
    const selection = this.state.selection !== null ? files[this.state.selection] : null;

    return (
      <div>
        <h1 className={selection ? 'title left anim' : 'title anim'}>{title}</h1>
        <div className={selection ? 'files left anim' : 'files anim'}>
          <table>
            <tbody>
              <tr>
                <th></th>
                <th>Title</th>
                <th>Date</th>
              </tr>
              {files.map(({ title, date }, index) => (
                <tr key={index} onClick={() => this.setState({ selection: index })}>
                  <td>icon</td>
                  <td>{title}</td>
                  <td>{date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {selection
         ? (
          <div key="overlay" className="box overlay anim border-trbl">
            <h2>{selection.title} | {title} | {selection.date}</h2>
            {selection.content}
            <div
              className="box back-btn"
              onClick={() => this.setState({ selection: null })}
            >
              BACK
            </div>
          </div>
        )
        : <div key="overlay" className="box overlay anim hidden" />}
      </div>
    );
  }
}

Files.propTypes = {
  title: React.PropTypes.string.isRequired,
  files: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      title: React.PropTypes.string.isRequired,
      date: React.PropTypes.string.isRequired,
      content: React.PropTypes.node,
    })
  ).isRequired,
};
