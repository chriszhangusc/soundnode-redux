import React from 'react';
import { connect } from 'react-redux';
import * as routes from 'common/constants/routeConsts';
import BoxShadow from 'common/components/BoxShadow';
import PropTypes from 'prop-types';
import { hideSidebar } from 'features/sidebar/sidebarActions';
import SidebarHeader from 'features/sidebar/SidebarHeader';
import { isSidebarHidden } from '../sidebarSelectors';
import SidebarTab from '../SidebarTab';
import Wrapper from './Wrapper';
import SidebarOverlay from '../SidebarOverlay';

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

function Sidebar({ hidden, hideSidebarAction }) {
  return (
    <div>
      <SidebarOverlay sidebarHidden={hidden} onClick={hideSidebarAction} />
      <Wrapper sidebarHidden={hidden}>
        <BoxShadow offsetX={2} offsetY={2} blur={10} spread={4} shade={9}>
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

const Connect = connect(mapStateToProps, mapDispatchToProps)(Sidebar);

export default Connect;
