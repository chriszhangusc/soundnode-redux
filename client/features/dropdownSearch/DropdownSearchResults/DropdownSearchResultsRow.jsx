import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Avatar from 'client/common/components/Avatar';
import styled from 'styled-components';
import { SEPARATOR_COLOR_DARK } from 'client/app/css/colors';

const StyledListItem = styled.li`
    padding: 8px 10px;
    white-space: nowrap;
    cursor: pointer;
    border-bottom: 1px solid ${SEPARATOR_COLOR_DARK};
    &:hover {
      background: ${SEPARATOR_COLOR_DARK};
    }
`;

function DropdownSearchResultsRow({ imageUrl, itemLinkUrl, itemTitle }) {
  return (
    <StyledListItem>
      <Avatar src={imageUrl} />
      <Link
        className="dropdown-item-title"
        to={itemLinkUrl}
        onMouseDown={(e) => {
          // This is not working properly
          e.stopPropagation();
        }}
      >
        {itemTitle}
      </Link>
    </StyledListItem>
  );
}

DropdownSearchResultsRow.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  itemLinkUrl: PropTypes.string.isRequired,
  itemTitle: PropTypes.string.isRequired,
};

export default DropdownSearchResultsRow;
