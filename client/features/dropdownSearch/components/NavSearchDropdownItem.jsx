import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Avatar from 'client/common/components/Avatar';

function NavSearchDropdownItem({ imageUrl, itemLinkUrl, itemTitle }) {
  return (
    <li className="dropdown-item">
      <div className="dropdown-item-wrapper">
        <Avatar src={imageUrl} />
        <Link
          to={itemLinkUrl}
          onMouseDown={(e) => {
            // This is not working properly
            e.stopPropagation();
          }}
        >
          <span className="dropdown-item-title">{itemTitle}</span>
        </Link>
      </div>
    </li>
  );
}

NavSearchDropdownItem.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  itemLinkUrl: PropTypes.string.isRequired,
  itemTitle: PropTypes.string.isRequired,
};

export default NavSearchDropdownItem;
