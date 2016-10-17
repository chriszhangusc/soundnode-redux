import React, { PropTypes } from 'react';

const LikeButton = ({ isLiked, onClick, btnText, btnClassName }) => (
  <button
    title={isLiked ? 'Unlike' : 'Like'}
    className={btnClassName}
    onClick={onClick}
  >
    <i className={`fa fa-heart ${isLiked ? 'active' : ''}`} />
    <span>{btnText && btnText.trim()}</span>
  </button>
);


LikeButton.propTypes = {
  isLiked: PropTypes.bool,
  onClick: PropTypes.func,
  btnClassName: PropTypes.string,
  btnText: PropTypes.string
};

export default LikeButton;
