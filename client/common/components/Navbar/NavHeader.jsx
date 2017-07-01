import React from 'react';
import styled from 'styled-components';
import { Glyphicon } from 'react-bootstrap';
import RouterLink from 'common/components/links/RouterLink';

const NavbarBrandName = styled.span`
  margin-left: 15px;
`;

const NavbarBrand = RouterLink.extend`
  font-size: 1.3rem;
`;

const NavHeaderWrapper = styled.div`
  display: inline-flex;
  align-items: center;
`;

function NavHeader() {
  return (
    <NavHeaderWrapper>
      <NavbarBrand to="/">
        <Glyphicon glyph="headphones" />
        <NavbarBrandName>SoundNode Redux</NavbarBrandName>
      </NavbarBrand>
    </NavHeaderWrapper>
  );
}

export default NavHeader;
