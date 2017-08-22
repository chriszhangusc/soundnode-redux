import React from 'react';
import RouterLink from 'common/components/links/RouterLink';
import SidebarToggleButton from './SidebarToggleButton';

const NavbarBrand = RouterLink.extend`font-size: 1.25rem;`;

function NavHeader() {
  return (
    <div>
      <SidebarToggleButton />
      <NavbarBrand to="/">SoundNode Redux</NavbarBrand>
    </div>
  );
}

export default NavHeader;
