import React from 'react';
import styled from 'styled-components';
import DropdownSearch from 'features/dropdownSearch/DropdownSearch';
import { LIGHT_BLACK } from 'app/css/colors';
import Auth from 'features/auth/Auth';
import { zIndexNav } from 'app/css/zIndex';
import NavHeader from './NavHeader';

const StyledNavbar = styled.nav`
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  background-color: ${LIGHT_BLACK};
  height: 80px;
  max-height: 80px;
  z-index: ${zIndexNav};
  padding: 0 100px;
  display: flex;
  justify-content: space-between;
`;

const NavbarSectionLeft = styled.section`
  display: flex;
  align-items: center;
  flex: 1;
`;

const NavbarSectionRight = styled.section`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex: 1;
`;

function Navbar() {
  return (
    <StyledNavbar>

      <NavbarSectionLeft>
        <NavHeader />
      </NavbarSectionLeft>

      <NavbarSectionRight>
        <DropdownSearch />
        <Auth />
      </NavbarSectionRight>

    </StyledNavbar>
  );
}

export default Navbar;
