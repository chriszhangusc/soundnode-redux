import React from 'react';
import PropTypes from 'prop-types';


const NavUser = ({ uid, displayName, photoUrl, handleLogin }) => {
  if (uid) {
    return (
      <div className="nav-user-wrapper">
        <img alt="user profile" className="nav-user-profile-image" src={photoUrl} />
        <span className="nav-user-display-name">{displayName}</span>
      </div>
    );
  }
  return (
    <div className="nav-user-wrapper">
      <div className="nav-user-link">
        <button className="icon-button" onClick={handleLogin}>
          <i className="fa fa-github" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};

NavUser.propTypes = {
  uid: PropTypes.string,
  photoUrl: PropTypes.string,
  displayName: PropTypes.string,
  handleLogin: PropTypes.func.isRequired,
};

export default NavUser;
