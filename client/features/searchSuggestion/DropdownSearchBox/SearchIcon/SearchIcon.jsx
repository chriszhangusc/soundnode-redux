import React from 'react';
import { fontColorSub } from 'app/css/colors';
import Icon from 'common/components/icons/Icon';
import Wrapper from './Wrapper';

function SearchIcon() {
  return (
    <Wrapper>
      <Icon name="search" color={fontColorSub} />
    </Wrapper>
  );
}

export default SearchIcon;
