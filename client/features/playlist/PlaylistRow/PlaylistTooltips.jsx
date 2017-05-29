import React from 'react';
import styled from 'styled-components';
import { SEPARATOR_COLOR_CLEAN, SEPARATOR_COLOR_DARK } from 'client/app/css/colors';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { TRACK_PROFILE_ROUTE } from 'client/common/constants/routeConsts';

// Tooltips styling is not working!!
const Wrapper = styled.span`
  flex-grow: 1;
  text-align: center;
  &:hover {
    /* Better ideas? */
    & > div {
      transform: scale(1,1);
    }
  }
`;

const OptionsListWrapper = styled.div`
  position: relative;
  /* This is for testing */
  /* transform: ${props => (props.index === 1 ? 'scale(1, 1)' : 'scale(0, 0)')}; */
  transform: scale(0, 0);
  transition: all .3s;
`;

const TooltipsArrowLeft = styled.div`
  display: block;
  position: absolute;
  top: -38px;
  width: 0;
  height: 0;
  border-top: 12px solid transparent;
  border-bottom: 10px solid transparent;
  border-left: 12px solid ${SEPARATOR_COLOR_CLEAN};
`;

const OptionsList = styled.ul`
    position: absolute;
    right: 45px;
    top: -128px;
    display: block;
    background: ${SEPARATOR_COLOR_CLEAN};
    z-index: 99999;
    border-radius: 2px;

    & li:last-child {
      border-bottom: none;
    }
`;

const OptionsListItem = styled.li`
    line-height: 20px;
    padding: 10px;
    text-align: center;
    border-bottom: 1px solid ${SEPARATOR_COLOR_DARK};
    &:hover {
      cursor: pointer;
      background: ${SEPARATOR_COLOR_DARK};
    }
`;

function PlaylistTooltips({ index, trackId }) {
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
            <Link
              to={`${TRACK_PROFILE_ROUTE}/${trackId}`}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              Go to track
            </Link>
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

export default connect()(PlaylistTooltips);
