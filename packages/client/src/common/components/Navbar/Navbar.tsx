import React, { useEffect } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { RouteComponentProps } from 'react-router-dom';
import SearchSuggestion from '@soundnode-redux/client/src/features/searchSuggestion/SearchSuggestion';
import Auth from '@soundnode-redux/client/src/features/auth/Auth';
// import BoxShadow from '@soundnode-redux/client/src/common/components/BoxShadow';
import Fixed from '@soundnode-redux/client/src/common/components/Fixed';
import RouterLink from '@soundnode-redux/client/src/common/components/links/RouterLink';
import LinearProgress from '@material-ui/core/LinearProgress';
import Fade from '@material-ui/core/Fade';
import {
  startNavProgressLoader,
  stopNavProgressLoader,
} from '@soundnode-redux/client/src/redux/ui/navProgress/actions';

import SidebarToggleButton from './SidebarToggleButton';
import { isNavProgressLoading } from '../../../redux/ui/navProgress/selectors';

const NavWrapper = styled(Fixed)`
  top: 0;
  left: 0;
  width: 100%;
  z-index: ${props => props.theme.zIndexes.headerBar};
  background-color: ${props => props.theme.colors.bgSub};
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0px 87px;
`;

const SidebarWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex: 1;
`;

const SuggestionWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex: 1;
`;

const NavBrand = styled(RouterLink)`
  font-size: 1.25rem;
`;

type Props = RouteComponentProps & {
  loading: boolean;
  dispatch: any;
};

function Navbar({ loading, dispatch, location }: Props) {
  useEffect(
    () => {
      dispatch(startNavProgressLoader());

      const timeout = setTimeout(() => {
        dispatch(stopNavProgressLoader());
      }, 500);

      return () => {
        clearTimeout(timeout);
      };
    },
    [location.pathname],
  );

  return (
    <NavWrapper>
      <ContentWrapper>
        <SidebarWrapper>
          <SidebarToggleButton />
          <NavBrand to="/">SoundNode Redux</NavBrand>
        </SidebarWrapper>

        <SuggestionWrapper>
          <SearchSuggestion />
          <Auth />
        </SuggestionWrapper>
      </ContentWrapper>

      <Fade in={loading} timeout={1000}>
        <LinearProgress />
      </Fade>
    </NavWrapper>
  );
}

const mapState = state => ({
  loading: isNavProgressLoading(state),
});

export default withRouter(connect(mapState)(Navbar));
