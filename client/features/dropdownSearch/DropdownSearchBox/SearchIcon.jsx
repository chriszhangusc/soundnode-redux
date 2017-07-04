import React from 'react';
import { FONT_COLOR_SECONDARY } from 'app/css/colors';
import styled from 'styled-components';
import Icon from 'common/components/icons/Icon';

const SearchIconWrapper = styled.span`
    position: absolute;
    top: 5px;
    left: 10px;
`;

function SearchIcon() {
  return (
    <SearchIconWrapper>
      <Icon name="search" color={FONT_COLOR_SECONDARY} />
    </SearchIconWrapper>
  );
}

export default SearchIcon;
