import React from 'react';
import styled from 'styled-components';
import DropdownSearch from 'client/features/dropdownSearch';
// import NavUserContainer from '../containers/NavUserContainer';
import { LIGHT_BLACK } from 'client/app/css/colors';
import Auth from 'client/features/auth/Auth';
import NavHeader from './NavHeader';

const NavBar = styled.nav`
  background-color: ${LIGHT_BLACK};
  height: 70px;
`;

const NavBarContentWrapper = styled.div`
  padding: 0 100px;
  display: flex;
  justify-content: space-between;
`;

const InnerWrapper = styled.div`
  display: flex;
  width: 470px;
  justify-content: space-between;
`;

/* This is our main Nav layout */
function Nav() {
  return (
    <NavBar className="navbar navbar-fixed-top">
      <NavBarContentWrapper>
        <NavHeader />
        <InnerWrapper>
          <DropdownSearch />
          <Auth />
        </InnerWrapper>
      </NavBarContentWrapper>
    </NavBar>
  );
}

export default Nav;
