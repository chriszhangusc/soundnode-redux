import React from 'react';
import DropdownSearch from 'features/dropdownSearch/DropdownSearch';
import Auth from 'features/auth/Auth';
import { Flex } from 'grid-styled';
import Fixed from 'common/components/Fixed';
import BoxShadow from 'common/components/BoxShadow';
import NavHeader from './NavHeader';

const Nav = Fixed.extend`
  top: 0;
  left: 0;
  width: 100%;
  z-index: ${props => props.theme.zIndexes[2]};
  background-color: ${props => props.theme.colors.bgSub};
`;

function Navbar() {
  return (
    <Nav>
      <BoxShadow blur={10} spread={4} shade={3}>
        <Flex justify="space-between" px={100} py={0}>
          <Flex align="center" justify="flex-start" flex="1">
            <NavHeader />
          </Flex>

          <Flex align="center" justify="flex-end" flex="1">
            <DropdownSearch />
            <Auth />
          </Flex>
        </Flex>
      </BoxShadow>
    </Nav>
  );
}

export default Navbar;
