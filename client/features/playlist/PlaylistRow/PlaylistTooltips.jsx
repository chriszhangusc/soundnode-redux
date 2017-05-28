import React from 'react';
import styled from 'styled-components';
import { SEPARATOR_COLOR_CLEAN, SEPARATOR_COLOR_DARK } from 'client/app/css/colors';
import { connect } from 'react-redux';

// Tooltips styling is not working!!
const Wrapper = styled.span`
  flex-grow: 1;
  position: relative;
  text-align: center;
  &:hover {
    /* Better ideas? */
    & > div {
      display: block;
    }
  }
`;

const OptionsListWrapper = styled.div`
  display: none;
`;

const TooltipsArrowLeft = styled.div`
  display: block;
  position: absolute;
  top: 11px;
  width: 0;
  height: 0;
  border-top: 12px solid transparent;
  border-bottom: 10px solid transparent;
  border-left: 12px solid ${SEPARATOR_COLOR_CLEAN};
`;

const OptionsList = styled.ul`
    position: absolute;
    right: 45px;
    top: -78px;
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
      background: ${SEPARATOR_COLOR_DARK};
    }
`;

function PlaylistTooltips({ index }) {
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
          <OptionsListItem>Go to track</OptionsListItem>
        </OptionsList>
      </OptionsListWrapper>
    </Wrapper>
  );
}

function mapStateToProps(state) {

}

function mapDispatchToProps(dispatch) {

}

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistTooltips);
