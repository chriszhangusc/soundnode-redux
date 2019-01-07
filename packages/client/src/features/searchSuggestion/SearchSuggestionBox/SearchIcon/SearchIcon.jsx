import React from 'react';
import { fontColorSub } from '@soundnode-redux/client/src/app/css/colors';
import Icon from '@soundnode-redux/client/src/common/components/icons/Icon';
import Wrapper from './Wrapper';

function SearchIcon() {
  return (
    <Wrapper>
      <Icon iconName="search" color={fontColorSub} />
    </Wrapper>
  );
}

export default SearchIcon;
