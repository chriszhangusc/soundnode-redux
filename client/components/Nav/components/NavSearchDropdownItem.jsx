import React, { PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';

const NavSearchDropdownItem = ({
  imageUrl,
  defaultImageUrl,
  itemLinkUrl,
  itemTitle
}) => (<li className="nav-search-result-item">
  <img
    alt="user-profile-img"
    className="nav-search-result-item-image"
    src={imageUrl || defaultImageUrl}
  />
  <Link
    onMouseDown={(e) => {
      e.stopPropagation();
      e.preventDefault();
      browserHistory.push(itemLinkUrl);
    }}
  >
    <span className="nav-search-result-item-username">{itemTitle}</span>
  </Link>
</li>);

NavSearchDropdownItem.propTypes = {
  imageUrl: PropTypes.string,
  defaultImageUrl: PropTypes.string,
  itemLinkUrl: PropTypes.string,
  itemTitle: PropTypes.string
};

export default NavSearchDropdownItem;
