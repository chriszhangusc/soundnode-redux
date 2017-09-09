import React from 'react';
import SidebarToggleButton from './SidebarToggleButton';
import NavBrand from './NavBrand';
import Wrapper from './Wrapper';

function SidebarHeader() {
  return (
    <Wrapper>
      <SidebarToggleButton />
      <NavBrand to="/">SoundNode Redux</NavBrand>
    </Wrapper>
  );
}

export default SidebarHeader;
