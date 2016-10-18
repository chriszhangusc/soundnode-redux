import React, { PropTypes } from 'react';
/*
 * All buttons in our app would be MagicButton.
 * It's basically just a generic button with icon options.
 */
const MagicButton = ({ title, onClick, text, btnClassName, iconClassName }) => (
  <button
    title={title}
    className={btnClassName}
    onClick={onClick}
  >
    { iconClassName && <i className={iconClassName} /> }
    {text && <span>{text.trim()}</span>}
  </button>
);

MagicButton.propTypes = {
  title: PropTypes.string,
  onClick: PropTypes.func,
  btnClassName: PropTypes.string,
  iconClassName: PropTypes.string,
  text: PropTypes.string
};

export default MagicButton;
