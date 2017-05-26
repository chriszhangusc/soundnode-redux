import React from 'react';
import { HOST } from 'client/common/constants/appConsts';
import styled from 'styled-components';
import { Glyphicon } from 'react-bootstrap';

const NavbarBrandName = styled.span`
  margin-left: 15px;
`;

const NavbarBrand = styled.a`
  line-height: 70px;
  font-size: 1.3rem;
`;


function NavHeader() {
  return (
    <div>
      <NavbarBrand href={HOST}>
        <Glyphicon glyph="headphones" />
        <NavbarBrandName>Redux Music</NavbarBrandName>
      </NavbarBrand>
    </div>
  );
}

export default NavHeader;
