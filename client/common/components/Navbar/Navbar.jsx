import React from 'react';
import styled from 'styled-components';
import DropdownSearch from 'features/dropdownSearch/DropdownSearch';
import Auth from 'features/auth/Auth';
import { Flex } from 'grid-styled';
import NavHeader from './NavHeader';

const StyledNavbar = styled.nav`
  position: fixed;
  display: flex;
  width: 100%;
  top: 0;
  left: 0;
  background-color: ${props => props.theme.colors.bgColorSub};
  height: 80px;
  max-height: 80px;
  z-index: ${props => props.theme.zIndexes[2]};
  padding: 0 100px;
  justify-content: space-between;
`;

function Navbar() {
  return (
    <StyledNavbar>
      <Flex align="center" justify="flex-start" flex="1">
        <NavHeader />
      </Flex>

      <Flex align="center" justify="flex-end" flex="1">
        <DropdownSearch />
        <Auth />
      </Flex>
    </StyledNavbar>
  );
}

export default Navbar;
