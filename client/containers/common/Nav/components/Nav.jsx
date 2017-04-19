import React from 'react';
import styled from 'styled-components';
import { LIGHT_BLACK } from 'client/constants/css/Colors';

import DropdownSearch from 'client/containers/common/DropdownSearch';
// import NavUserContainer from '../containers/NavUserContainer';
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

/* This is our main Nav layout */
function Nav() {
  return (
    <NavBar className="navbar navbar-fixed-top">
      <NavBarContentWrapper>
        <NavHeader />
        <DropdownSearch />
      </NavBarContentWrapper>
    </NavBar>
  );
}

export default Nav;
