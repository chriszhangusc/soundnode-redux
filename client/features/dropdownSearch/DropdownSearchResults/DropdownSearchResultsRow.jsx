import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Avatar from 'client/common/components/Avatar';
import styled from 'styled-components';
import { media } from 'client/app/css/styleUtils';
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

const DROPDOWN_SEARCH_TITLE_WIDTH = '320px';
const DROPDOWN_SEARCH_TITLE_WIDTH_MD = '370px';
const DROPDOWN_SEARCH_TITLE_WIDTH_LG = '390px';
const DROPDOWN_SEARCH_TITLE_WIDTH_4K = '450px';

const DropdownItemTitle = styled.span`
    margin-left: 10px;
    vertical-align: middle;
    display: inline-block;
    width: ${DROPDOWN_SEARCH_TITLE_WIDTH};
    ${media.desktop`width: ${DROPDOWN_SEARCH_TITLE_WIDTH_MD}`}
    ${media.desktopLG`width: ${DROPDOWN_SEARCH_TITLE_WIDTH_LG}`}
    ${media.desktop4K`width: ${DROPDOWN_SEARCH_TITLE_WIDTH_4K}`}
    text-overflow: ellipsis;
    overflow: hidden;
`;

// Clicking the link will also trigger onBlur of the search input which will cause the result to
// disappear before handling onClick event of the link,
// So we have to put the routing logic to onMouseDown which trigger before onblur.
function DropdownSearchResultsRow({ imageUrl, itemLinkUrl, itemTitle }) {
  return (
    <Link to={itemLinkUrl}>
      <StyledListItem>
        <Avatar src={imageUrl} />
        <DropdownItemTitle>{itemTitle}</DropdownItemTitle>
      </StyledListItem>
    </Link>
  );
}

DropdownSearchResultsRow.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  itemLinkUrl: PropTypes.string.isRequired,
  itemTitle: PropTypes.string.isRequired,
  // history: React.PropTypes.shape({
  //   push: React.PropTypes.func.isRequired,
  // }).isRequired,
};

export default DropdownSearchResultsRow;
