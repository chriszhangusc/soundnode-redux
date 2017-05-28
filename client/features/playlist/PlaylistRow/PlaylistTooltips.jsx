import React from 'react';
import styled from 'styled-components';
import { SEPARATOR_COLOR_CLEAN, SEPARATOR_COLOR_DARK } from 'client/app/css/colors';

// Tooltips styling is not working!!
const Wrapper = styled.div`
    position: relative;
    width: 10px;
    text-align: center;
    height: 17px;
    display: inline-block;
`;

const OptionsArrow = styled.div`
    display: none;
    position: absolute;
    top: -3px;
    right: 8px;
    width: 0;
    height: 0;
    border-top: 12px solid transparent;
    border-bottom: 10px solid transparent;
    border-left: 12px solid #3E3E40;
`;

const OptionsList = styled.div`
    display: none;
    position: absolute;
    right: 19px;
    top: -11px;
    background: ${SEPARATOR_COLOR_CLEAN};
    z-index: 10;
    border-radius: 2px;

    & li:last-child {
      border-bottom: none;
    }
`;

const OptionsListItem = styled.li`
    padding: 10px;
    text-align: center;
    border-bottom: 1px solid ${SEPARATOR_COLOR_DARK};
    &:hover {
      background: ${SEPARATOR_COLOR_DARK};
    }
`;

function PlaylistTooltips() {
  return (
    <Wrapper>
      <i className="fa fa-ellipsis-v" />
      <OptionsArrow />
      <OptionsList>
        <OptionsListItem>Remove</OptionsListItem>
        <OptionsListItem>Like</OptionsListItem>
        <OptionsListItem>Repost</OptionsListItem>
        <OptionsListItem>Add to playlist</OptionsListItem>
        <OptionsListItem>Go to track</OptionsListItem>
      </OptionsList>
    </Wrapper>
  );
}

export default PlaylistTooltips;
