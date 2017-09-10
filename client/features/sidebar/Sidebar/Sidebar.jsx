import React from 'react';
import { connect } from 'react-redux';
import * as routes from 'common/constants/routeConsts';
import BoxShadow from 'common/components/BoxShadow';
import PropTypes from 'prop-types';
import { hideSidebar } from 'features/sidebar/sidebarActions';
import SidebarHeader from 'features/sidebar/SidebarHeader';
import SidebarOverlay from 'features/sidebar/SidebarOverlay';
import { withRouter } from 'react-router';
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

function Sidebar({ hidden, hideSidebarAction }) {
  return (
    <div>
      <SidebarOverlay onClick={hideSidebarAction} hidden={hidden} />
      <Wrapper sidebarHidden={hidden}>
        <BoxShadow offsetX={2} offsetY={2} blur={10} spread={4} shade={9}>
          <SidebarHeader />
          <ul>
            {sidebarItemList.map(item => (
              <SidebarTab {...item} key={item.title} onClick={hideSidebarAction} />
            ))}
          </ul>
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

/*
There will be problem when using connect from redux
because connect will block update of route change.
*/
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Sidebar));
