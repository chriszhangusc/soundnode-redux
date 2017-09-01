import React from 'react';
import { connect } from 'react-redux';
import * as routes from 'common/constants/routeConsts';
import BoxShadow from 'common/components/BoxShadow';
import PropTypes from 'prop-types';
import { isSidebarHidden } from './sidebarSelectors';
import SidebarTab from './SidebarTab';
import Wrapper from './Wrapper';

const sidebarItemList = [
  {
    to: routes.CHARTS_ROUTE,
    iconClassName: 'fa fa-trophy',
    title: 'Top 50',
  },
  {
    to: routes.FAVORITES_ROUTE,
    iconClassName: 'fa fa-heart',
    title: 'Favorites',
  },
  {
    to: routes.PLAYLISTS_ROUTE,
    iconClassName: 'fa fa-list',
    title: 'Playlists',
  },
  {
    to: routes.STREAM_ROUTE,
    iconClassName: 'fa fa-music',
    title: 'Stream',
  },
];

// Should be refactored to take sidebar items as props
function Sidebar({ hidden }) {
  // The activeClassName thing would need work-around to work with styled-component: https://github.com/styled-components/styled-components/issues/184
  // #TODO: Fix shadow not working issue.
  return (
    <Wrapper sidebarHidden={hidden}>
      <BoxShadow blur={10} spread={4} shade={3}>
        <ul>
          {sidebarItemList.map(item => <SidebarTab {...item} key={item.title} />)}
        </ul>
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

export default connect(mapStateToProps)(Sidebar);
