import React from 'react';
import styled from 'styled-components';
import SearchSuggestion from '@soundnode-redux/client/src/features/searchSuggestion/SearchSuggestion';
import Auth from '@soundnode-redux/client/src/features/auth/Auth';
import BoxShadow from '@soundnode-redux/client/src/common/components/BoxShadow';
import SidebarToggleButton from './SidebarToggleButton';
import NavBrand from './NavBrand';
import NavWrapper from './NavWrapper';

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0px 87px;
`;

const SidebarWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex: 1;
`;

const SuggestionWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex: 1;
`;

function Navbar() {
  return (
    <NavWrapper>
      <BoxShadow blur={10} spread={8} shade={3}>
        <ContentWrapper>
          <SidebarWrapper>
            <SidebarToggleButton />
            <NavBrand to="/">SoundNode Redux</NavBrand>
          </SidebarWrapper>

          <SuggestionWrapper>
            <SearchSuggestion />
            <Auth />
          </SuggestionWrapper>
        </ContentWrapper>
      </BoxShadow>
    </NavWrapper>
  );
}

export default Navbar;
