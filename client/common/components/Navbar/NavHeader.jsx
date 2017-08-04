import React from 'react';
import styled from 'styled-components';
import { Glyphicon } from 'react-bootstrap';
import RouterLink from 'common/components/links/RouterLink';

const NavbarBrandName = styled.span`margin-left: 15px;`;

const NavbarBrand = RouterLink.extend`font-size: 1.25rem;`;

function NavHeader() {
  return (
    <NavbarBrand to="/">
      <Glyphicon glyph="headphones" />
      <NavbarBrandName>SoundNode Redux</NavbarBrandName>
    </NavbarBrand>
  );
}

export default NavHeader;
