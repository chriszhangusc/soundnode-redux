import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Avatar from 'client/components/Avatar';

const NavSearchDropdownItem = ({
  imageUrl,
  itemLinkUrl,
  itemTitle,
}) => (
  <li className="dropdown-item">
    <div className="dropdown-item-wrapper">
      <Avatar src={imageUrl} />
      <Link
        to={itemLinkUrl}
        onMouseDown={(e) => {
          // This is not working properly
          e.stopPropagation();
          {/*browserHistory.push(itemLinkUrl);*/}
        }}
      >
        <span className="dropdown-item-title">{itemTitle}</span>
      </Link>
    </div>
  </li>
);

NavSearchDropdownItem.defaultProps = {
  imageUrl: '',
  itemLinkUrl: '',
  itemTitle: '',
};

NavSearchDropdownItem.propTypes = {
  imageUrl: PropTypes.string,
  itemLinkUrl: PropTypes.string,
  itemTitle: PropTypes.string,
};

export default NavSearchDropdownItem;
