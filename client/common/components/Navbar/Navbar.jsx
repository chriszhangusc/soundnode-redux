import React from 'react';
import DropdownSearch from 'features/dropdownSearch/DropdownSearch';
import Auth from 'features/auth/Auth';
import { Flex } from 'grid-styled';
import BoxShadow from 'common/components/BoxShadow';
import SidebarToggleButton from './SidebarToggleButton';
import NavBrand from './NavBrand';
import NavWrapper from './NavWrapper';

function Navbar() {
  return (
    <BoxShadow blur={10} spread={4} shade={3}>
      <NavWrapper>
        <Flex justify="space-between" px={100} py={0}>
          <Flex align="center" justify="flex-start" flex="1">
            <SidebarToggleButton />
            <NavBrand to="/">SoundNode Redux</NavBrand>
          </Flex>

          <Flex align="center" justify="flex-end" flex="1">
            <DropdownSearch />
            <Auth />
          </Flex>
        </Flex>
      </NavWrapper>
    </BoxShadow>
  );
}

export default Navbar;
