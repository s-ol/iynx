import React from 'react';
import memoize from 'memoization';

const MenuButton = memoize(({ title, icon, top, left, onClick }) => (
  <div className="menu-btn" style={{ top, left }}>
    <img src={`files/icons/${title}.png`} />
    <div onClick={onClick} />
  </div>
));

export default MenuButton;
