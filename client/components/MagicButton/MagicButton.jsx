import React, { PropTypes } from 'react';
/*
 * All buttons in our app would be MagicButton.
 * It's basically just a generic button with icon options.
 */
const MagicButton = ({ title, onClick, btnText, btnClassName, iconClassName }) => (
  <button
    title={title}
    className={btnClassName}
    onClick={onClick}
  >
    { iconClassName && <i className={iconClassName} /> }
    {btnText && <span>{btnText.trim()}</span>}
  </button>
);

MagicButton.propTypes = {
  title: PropTypes.string,
  onClick: PropTypes.func,
  btnClassName: PropTypes.string,
  iconClassName: PropTypes.string,
  btnText: PropTypes.string
};

export default MagicButton;
