import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import * as routes from 'common/constants/routeConsts';
import BoxShadow from 'common/components/BoxShadow';
import PropTypes from 'prop-types';
import { hideSidebar } from 'features/sidebar/sidebarActions';
import SidebarHeader from 'features/sidebar/SidebarHeader';
import { isSidebarHidden } from '../sidebarSelectors';
import SidebarTab from '../SidebarTab';
import Wrapper from './Wrapper';

const sidebarItemList = [
  {
    to: routes.CHARTS_ROUTE,
    iconName: 'trophy',
    title: 'Top 50',
  },
  {
    to: routes.FAVORITES_ROUTE,
    iconName: 'heart',
    title: 'Favorites',
  },
  {
    to: routes.PLAY_QUEUES_ROUTE,
    iconName: 'list',
    title: 'Playlists',
  },
  {
    to: routes.STREAM_ROUTE,
    iconName: 'music',
    title: 'Stream',
  },
];

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transition-property: opacity;
  z-index: ${props => (props.sidebarHidden ? props.theme.zIndexes[0] : props.theme.zIndexes[4])};
  opacity: ${props => (props.sidebarHidden ? 0 : 1)};
  background: rgba(0, 0, 0, 0.5);
`;

function Sidebar({ hidden, hideSidebarAction }) {
  return (
    <div>
      <Overlay sidebarHidden={hidden} onClick={hideSidebarAction} />
      <Wrapper sidebarHidden={hidden}>
        <BoxShadow blur={10} spread={4} shade={9}>
          <SidebarHeader />
          <ul>{sidebarItemList.map(item => <SidebarTab {...item} key={item.title} />)}</ul>
        </BoxShadow>
      </Wrapper>
    </div>
  );
}

Sidebar.propTypes = {
  hidden: PropTypes.bool.isRequired,
  hideSidebarAction: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    hidden: isSidebarHidden(state),
  };
}

const mapDispatchToProps = {
  hideSidebarAction: hideSidebar,
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
