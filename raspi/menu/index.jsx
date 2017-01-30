import React from 'react';
import memoize from 'memoization';

const MenuButton = memoize(({ title, icon, top, left, onClick }) => (
  <div className="menu-btn" style={{ top, left }}>
    <img src={`images/${title}.png`} />
    <div onClick={onClick} />
  </div>
));

export default MenuButton;
