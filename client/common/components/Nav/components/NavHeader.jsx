import React from 'react';
import { HOST } from 'client/common/constants/AppConsts';
import styled from 'styled-components';
import { Glyphicon } from 'react-bootstrap';

const NavBarBrandName = styled.span`
  margin-left: 15px;
`;

function NavHeader() {
  return (
    <div>
      <a className="navbar-brand" href={HOST}>
        <Glyphicon glyph="headphones" />
        <NavBarBrandName>Redux Music</NavBarBrandName>
      </a>
    </div>
  );
}

export default NavHeader;
