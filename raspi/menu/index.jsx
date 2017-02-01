import React from 'react';
import memoize from 'memoization';

const MenuButton = memoize(({ title, icon, style, onClick, disabled }) => (
  <div className={`menu-btn${disabled ? ' disabled' : ''}`} style={style}>
    <img src={`images/${title}.png`} />
    <div onClick={!disabled && onClick} />
  </div>
));

export default MenuButton;
