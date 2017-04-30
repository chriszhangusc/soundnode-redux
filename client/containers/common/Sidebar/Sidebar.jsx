import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import shortid from 'shortid';

import {
  SIDEBAR_WIDTH_DESKTOP,
  SIDEBAR_WIDTH_DESKTOP_LG,
  SIDEBAR_WIDTH_4K,
} from 'client/css/variables';

import { media } from 'client/css/style-utils';
import { LIGHT_BLACK } from 'client/css/colors';

import SidebarItem from './SidebarItem';

const SidebarWrapper = styled.div`
  position: fixed;
  height: 100%;
  background-color: ${LIGHT_BLACK};
  ${media.desktop`width: ${SIDEBAR_WIDTH_DESKTOP}`}
  ${media.desktopLG`width: ${SIDEBAR_WIDTH_DESKTOP_LG}`}
  ${media.desktop4K`width: ${SIDEBAR_WIDTH_4K}`}
`;

// Should be refactored to take sidebar items as props
function Sidebar({ sidebarData }) {
  // The activeClassName thing would need work-around to work with styled-component: https://github.com/styled-components/styled-components/issues/184
  return (
    <SidebarWrapper>
      <ul>
        {
          sidebarData.map(d => <SidebarItem {...d} key={shortid.generate()} />)
        }
      </ul>
    </SidebarWrapper>
  );
}

Sidebar.propTypes = {
  sidebarData: PropTypes.arrayOf(PropTypes.shape({
    to: PropTypes.string.isRequired,
    iconClassName: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  })).isRequired,
};

export default Sidebar;
