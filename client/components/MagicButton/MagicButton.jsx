import React, { PropTypes } from 'react';
/*
 * It's basically just a generic button with icon options.
 */
const MagicButton = ({ title, onClick, text, btnClassName, iconClassName }) => (
  <button
    title={title}
    className={btnClassName}
    onClick={onClick}
  >
    {iconClassName && <i className={iconClassName} />}
    {text && <span>{text.trim()}</span>}
  </button>
);

// Specifies the default values for props:
// #TODO: Add default classnames
MagicButton.defaultProps = {
  title: '',
  onClick: () => { console.log('You have to specifiy an onclick handler!'); },
  btnClassName: '',
  iconClassName: '',
  text: '',
};

MagicButton.propTypes = {
  title: PropTypes.string,
  onClick: PropTypes.func,
  btnClassName: PropTypes.string,
  iconClassName: PropTypes.string,
  text: PropTypes.string,
};

export default MagicButton;
