import React from 'react';
import { HOST } from 'client/common/constants/AppConsts';
import styled from 'styled-components';

const NavHeaderWrapper = styled.div`
`;

const NavBarBrandIcon = styled.span`
  margin-right: 15px;
`;

const NavBarBrandName = styled.span`
`;

function NavHeader() {
  return (
    <NavHeaderWrapper>
      <a className="navbar-brand" href={HOST}>
        <NavBarBrandIcon className="glyphicon glyphicon-headphones" />
        <NavBarBrandName>Redux Music</NavBarBrandName>
      </a>
    </NavHeaderWrapper>
  );
}

export default NavHeader;
