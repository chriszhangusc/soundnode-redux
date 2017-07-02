import React from 'react';
import PropTypes from 'prop-types';
import RouterLink from 'common/components/links/RouterLink';
import Avatar from 'common/components/images/Avatar';
import styled from 'styled-components';
import { SEPARATOR_COLOR_DARK } from 'app/css/colors';

const StyledListItem = styled.li`
  padding: 8px 10px;
  white-space: nowrap;
  cursor: pointer;
  display: flex;
  align-items: middle;
  border-bottom: 1px solid ${SEPARATOR_COLOR_DARK};
  &:hover {
    background: ${SEPARATOR_COLOR_DARK};
  }
`;

const DropdownItemTitle = styled.span`
  display: inline-block;
  margin-left: 10px;
  line-height: 32px;
  text-overflow: ellipsis;
  overflow: hidden;
`;

// Clicking the link will also trigger onBlur of the search input which will cause the result to
// disappear before handling onClick event of the link,
// So we have to put the routing logic to onMouseDown which trigger before onblur.
function DropdownSearchResultsRow({ type, imageUrl, itemLinkUrl, itemTitle }) {
  return (
    <div>
      <RouterLink to={itemLinkUrl}>
        <StyledListItem>
          <Avatar src={imageUrl} size="small" rounded={type === 'user'} />
          <DropdownItemTitle>{itemTitle}</DropdownItemTitle>
        </StyledListItem>
      </RouterLink>
    </div>
  );
}

DropdownSearchResultsRow.defaultProps = {
  imageUrl: undefined,
};

DropdownSearchResultsRow.propTypes = {
  imageUrl: PropTypes.string,
  itemLinkUrl: PropTypes.string.isRequired,
  itemTitle: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['user', 'track']).isRequired,
};

export default DropdownSearchResultsRow;
