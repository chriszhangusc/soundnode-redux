import React from 'react';
import { HOST } from 'client/common/constants/appConsts';
import styled from 'styled-components';
import { Glyphicon } from 'react-bootstrap';

const NavbarBrandName = styled.span`
  margin-left: 15px;
`;

const NavbarBrand = styled.a`
  font-size: 1.3rem;
`;

const NavHeaderWrapper = styled.div`
  display: inline-flex;
  align-items: center;
`;

function NavHeader() {
  return (
    <NavHeaderWrapper>
      <NavbarBrand href={HOST}>
        <Glyphicon glyph="headphones" />
        <NavbarBrandName>Redux Music</NavbarBrandName>
      </NavbarBrand>
    </NavHeaderWrapper>
  );
}

export default NavHeader;
