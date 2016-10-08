import React, { PropTypes } from 'react';

const NavUser = ({ uid, displayName, photoUrl, handleLogin }) => {
  if (uid) {
    return (
      <div className="table-item">
        <img alt="user profile" className="user-profile-image" src={photoUrl} />
        <span className="user-display-name">{displayName}</span>
      </div>
    );
  }
  return (
    <div className="table-item">
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
  handleLogin: PropTypes.func.isRequired
};

export default NavUser;
