import React from 'react';
import PropTypes from 'prop-types';
import { Link, browserHistory } from 'react-router';

const NavSearchDropdownItem = ({
  imageUrl,
  itemLinkUrl,
  itemTitle,
}) => (<li className="dropdown-item">
    <div className="dropdown-item-wrapper">
      <img
        alt="user-profile-img"
        className="dropdown-item-image"
        src={imageUrl}
      />
      <Link
        onMouseDown={(e) => {
          e.stopPropagation();

          browserHistory.push(itemLinkUrl);
        }}
      >
        <span className="dropdown-item-title">{itemTitle}</span>
      </Link>
    </div>
  </li>);

NavSearchDropdownItem.propTypes = {
  imageUrl: PropTypes.string,
  itemLinkUrl: PropTypes.string,
  itemTitle: PropTypes.string,
};

export default NavSearchDropdownItem;
