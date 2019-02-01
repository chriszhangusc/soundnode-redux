import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import * as routes from '@soundnode-redux/client/src/common/constants/routeConsts';
import BoxShadow from '@soundnode-redux/client/src/common/components/BoxShadow';
import Fixed from '@soundnode-redux/client/src/common/components/Fixed';
import { hideSidebar } from '@soundnode-redux/client/src/features/sidebar/sidebarActions';
import SidebarHeader from '@soundnode-redux/client/src/features/sidebar/SidebarHeader';
import SidebarOverlay from '@soundnode-redux/client/src/features/sidebar/SidebarOverlay';
import { isSidebarHidden } from '@soundnode-redux/client/src/features/sidebar/sidebarSelectors';
import SidebarTab from '@soundnode-redux/client/src/features/sidebar/SidebarTab';
import { withRouter } from 'react-router';

const SIDEBAR_ITEM_LIST = [
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

const Wrapper = styled(Fixed)`
  width: 300px;
  top: 0;
  left: 0;
  height: 100%;
  background-color: ${props => props.theme.colors.bgSub};
  z-index: ${props => props.theme.zIndexes.sidebar};
  transform: translateX(
    ${props => (props.sidebarHidden ? '-310px' : '0')}
  ); /* 10px more to hide shadow */
  transition: transform 400ms ease-in-out;
`;

type Props = {
  hidden: boolean;
  hideSidebar: () => void;
};

function Sidebar(props: Props) {
  const { hidden } = props;

  return (
    <div>
      <SidebarOverlay active={!hidden} onClick={props.hideSidebar} />
      <Wrapper sidebarHidden={hidden}>
        <BoxShadow offsetX={2} offsetY={2} blur={10} spread={4} shade={9}>
          <SidebarHeader />
          <ul>
            {SIDEBAR_ITEM_LIST.map(item => (
              <SidebarTab {...item} key={item.title} onClick={props.hideSidebar} />
            ))}
          </ul>
        </BoxShadow>
      </Wrapper>
    </div>
  );
}

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
export default withRouter(
  connect(
    mapStateToProps,
    { hideSidebar },
  )(Sidebar),
);
