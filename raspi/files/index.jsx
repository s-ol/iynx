import React from 'react';
import _personalFiles from './personalFiles';
import workFiles from './personalFiles';
import galleryFiles from './galleryFiles';
import MenuButton from '../menu';

export * from './workFiles';
export * from './personalFiles';
export * from './galleryFiles';

export const Preview = ({ title, date, content, folder, onReturn }) => (
  <div key="overlay" className="overlay view">
    <div className="box border-trbl">
      <h2>{title} | {folder} | {date}</h2>
      {content}
      <div
        className="box back-btn"
        onClick={onReturn}
      >
        BACK
      </div>
    </div>
  </div>
);

export const Files = ({ title, files, onSelect, onReturn }) => (
  <div className="files view">
    <h1 className="title">{title}</h1>
    <div className="border">
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>Title</th>
            <th>Date</th>
          </tr>
          {files.map(({ title, date }, index) => (
            <tr key={index} onClick={() => onSelect(index)}>
              <td>icon</td>
              <td>{title}</td>
              <td>{date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <MenuButton
      onClick={onReturn}
      title="iynx"
      style={{ left: 656, top: 319 }}
    />
  </div>
);

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
