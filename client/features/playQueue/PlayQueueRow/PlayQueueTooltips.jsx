import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import RouterLink from 'common/components/links/RouterLink';
import { TRACK_PROFILE_ROUTE } from 'common/constants/routeConsts';
import { media } from 'app/css/styleUtils';

// Tooltips styling is not working!!
const Wrapper = styled.span`
  flex-grow: 1;
  text-align: center;
  &:hover {
    /* Better ideas? */
    & > div {
      transform: scale(1, 1);
    }
  }
`;

const OptionsListWrapper = styled.div`
  transform: scale(0, 0);
  transition: all .3s;
`;

const TooltipsArrowLeft = styled.div`
  display: block;
  position: absolute;
  top: -38px;
  ${media.desktopLG`right: 10px;`} width: 0;
  height: 0;
  border-top: 12px solid transparent;
  border-bottom: 10px solid transparent;
  border-left: 12px solid ${props => props.theme.colors.separatorClean};
`;

const OptionsList = styled.ul`
  position: absolute;

  ${media.desktopLG`right: 22px;`} ${media.desktop4K`right: 45px;`} top: -128px;
  display: block;
  background: ${props => props.theme.colors.separatorClean};
  border-radius: 2px;

  & li:last-child {
    border-bottom: none;
  }
`;

const OptionsListItem = styled.li`
  line-height: 20px;
  padding: 10px;
  text-align: center;
  border-bottom: 1px solid ${props => props.theme.colors.separatorDark};
  &:hover {
    cursor: pointer;
    background: ${props => props.theme.colors.separatorDark};
  }
`;

function PlayQueueTooltips({ index, trackId }) {
  return (
    <Wrapper>
      <i className="fa fa-ellipsis-v" />
      <OptionsListWrapper index={index}>
        <TooltipsArrowLeft />
        <OptionsList>
          <OptionsListItem
            onClick={(e) => {
              e.stopPropagation();
              console.log('Remove');
            }}
          >
            Remove
          </OptionsListItem>
          <OptionsListItem>Like</OptionsListItem>
          <OptionsListItem>Repost</OptionsListItem>
          <OptionsListItem>Add to playlist</OptionsListItem>
          <OptionsListItem>
            <RouterLink
              to={`${TRACK_PROFILE_ROUTE}/${trackId}`}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              Go to track
            </RouterLink>
          </OptionsListItem>
        </OptionsList>
      </OptionsListWrapper>
    </Wrapper>
  );
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

PlayQueueTooltips.propTypes = {
  index: PropTypes.number.isRequired,
  trackId: PropTypes.number.isRequired,
};

export default connect()(PlayQueueTooltips);
