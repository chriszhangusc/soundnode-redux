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
const DROPDOWN_SEARCH_TITLE_WIDTH_4K = '450px';
const DROPDOWN_SEARCH_TITLE_WIDTH_LG = '390px';
const DROPDOWN_SEARCH_TITLE_WIDTH_MD = '370px';

const DropdownItemTitle = styled(Link)`
    margin-left: 10px;
    vertical-align: middle;
    color: $font-color-main;
    display: inline-block;
    width: ${DROPDOWN_SEARCH_TITLE_WIDTH};
    ${media.desktop`width: ${DROPDOWN_SEARCH_TITLE_WIDTH_MD}`}
    ${media.desktopLG`width: ${DROPDOWN_SEARCH_TITLE_WIDTH_LG}`}
    ${media.desktop4K`width: ${DROPDOWN_SEARCH_TITLE_WIDTH_4K}`}
    text-overflow: ellipsis;
    overflow: hidden;
`;

function DropdownSearchResultsRow({ imageUrl, itemLinkUrl, itemTitle }) {
  return (
    <StyledListItem>
      <Avatar src={imageUrl} />
      <DropdownItemTitle
        to={itemLinkUrl}
        onMouseDown={(e) => {
          // This is not working properly
          e.stopPropagation();
        }}
      >
        {itemTitle}
      </DropdownItemTitle>
    </StyledListItem>
  );
}

DropdownSearchResultsRow.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  itemLinkUrl: PropTypes.string.isRequired,
  itemTitle: PropTypes.string.isRequired,
};

export default DropdownSearchResultsRow;
