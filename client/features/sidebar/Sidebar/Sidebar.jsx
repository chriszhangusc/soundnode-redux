import React from 'react';
import { connect } from 'react-redux';
import * as routes from 'common/constants/routeConsts';
import BoxShadow from 'common/components/BoxShadow';
import PropTypes from 'prop-types';
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

function Sidebar({ hidden }) {
  return (
    <Wrapper sidebarHidden={hidden}>
      <BoxShadow blur={10} spread={4} shade={3}>
        <ul>{sidebarItemList.map(item => <SidebarTab {...item} key={item.title} />)}</ul>
      </BoxShadow>
    </Wrapper>
  );
}

Sidebar.propTypes = {
  hidden: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    hidden: isSidebarHidden(state),
  };
}

// https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/blocked-updates.md
// Using redux and react-router-v4 will cause problem when route changes.
export default withRouter(connect(mapStateToProps)(Sidebar));
