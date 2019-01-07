import React from 'react';
import { connect } from 'react-redux';
import * as routes from '@soundnode-redux/client/src/common/constants/routeConsts';
import BoxShadow from '@soundnode-redux/client/src/common/components/BoxShadow';
import PropTypes from 'prop-types';
import { hideSidebar } from '@soundnode-redux/client/src/features/sidebar/sidebarActions';
import SidebarHeader from '@soundnode-redux/client/src/features/sidebar/SidebarHeader';
import SidebarOverlay from '@soundnode-redux/client/src/features/sidebar/SidebarOverlay';
import { isSidebarHidden } from '@soundnode-redux/client/src/features/sidebar/sidebarSelectors';
import SidebarTab from '@soundnode-redux/client/src/features/sidebar/SidebarTab';
import { withRouter } from 'react-router';
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
    to: routes.PLAYLISTS_ROUTE,
    iconName: 'list',
    title: 'Playlists',
  },
  {
    to: routes.STREAM_ROUTE,
    iconName: 'music',
    title: 'Stream',
  },
];

function Sidebar(props) {
  const { hidden } = props;
  return (
    <div>
      <SidebarOverlay active={!hidden} onClick={props.hideSidebar} />
      <Wrapper sidebarHidden={hidden}>
        <BoxShadow offsetX={2} offsetY={2} blur={10} spread={4} shade={9}>
          <SidebarHeader />
          <ul>
            {sidebarItemList.map(item => (
              <SidebarTab {...item} key={item.title} onClick={props.hideSidebar} />
            ))}
          </ul>
        </BoxShadow>
      </Wrapper>
    </div>
  );
}

Sidebar.propTypes = {
  hidden: PropTypes.bool.isRequired,
  hideSidebar: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    hidden: isSidebarHidden(state),
  };
}

/*
Why use withRouter here?
There will be problem when using connect from redux
because connect will block update of route change.
*/
export default withRouter(connect(mapStateToProps, { hideSidebar })(Sidebar));
