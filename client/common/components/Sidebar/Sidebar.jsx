import React from 'react';
import { connect } from 'react-redux';
import * as routes from 'common/constants/routeConsts';
import BoxShadow from 'common/components/BoxShadow';
import PropTypes from 'prop-types';
import SidebarItem from './SidebarItem';
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
  return (
    <BoxShadow blur={10} spread={4} shade={3}>
      <Wrapper sidebarHidden={hidden}>
        <ul>
          {sidebarItemList.map(item => <SidebarItem {...item} key={item.title} />)}
        </ul>
      </Wrapper>
    </BoxShadow>
  );
}

Sidebar.propTypes = {
  hidden: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    hidden: state.sidebar.hidden,
  };
}

export default connect(mapStateToProps)(Sidebar);
