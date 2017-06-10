import React from 'react';
import styled from 'styled-components';
import DropdownSearch from 'client/features/dropdownSearch/DropdownSearch';
import { LIGHT_BLACK } from 'client/app/css/colors';
import Auth from 'client/features/auth/Auth';
import NavHeader from './NavHeader';

// Pure Navbar no bootstrap
const Navbar = styled.nav`
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  background-color: ${LIGHT_BLACK};
  height: 80px;
  max-height: 80px;
  z-index: 1000;

  padding: 0 100px;
  display: flex;
  justify-content: space-between;
`;

const InnerWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 0 15px;
`;

/* This is our main Nav layout */
function Nav() {
  return (
    <Navbar>
      <NavHeader />
      <InnerWrapper>
        <DropdownSearch />
        <Auth />
      </InnerWrapper>
    </Navbar>
  );
}

export default Nav;
