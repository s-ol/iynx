import React from 'react';

export default () => (
  <div>
    <h1>Hello World!</h1>
    We are using node {process.versions.node},
    Chrome {process.versions.chrome},
    and Electron {process.versions.electron}.
  </div>
);
