import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FONT_COLOR_PRIMARY, FONT_COLOR_SECONDARY } from 'client/app/css/colors';

const Wrapper = styled.div`
  display: flex;
  position: absolute;
  left: 0;
  bottom: 0;
`;

const LinkButtonWithIcon = styled.a`
  display: inline-block;
  border: 1px solid;
  border-radius: .25em;
  padding: 3px 6px;
  color: ${FONT_COLOR_SECONDARY};
  font-size: 0.75rem;
  margin-right: 10px;
  transition: all 200ms ease-in-out;
  & i {
    margin-right: 5px;
  }

  &:hover {
    cursor: pointer;
    color: ${FONT_COLOR_PRIMARY};
  }
`;

function TrackButtonGroup() {
  return (
    <Wrapper>
      <LinkButtonWithIcon><i className="fa fa-download" />DOWNLOAD</LinkButtonWithIcon>
      <LinkButtonWithIcon><i className="fa fa-bookmark" />ADD TO PLAYLIST</LinkButtonWithIcon>
      <LinkButtonWithIcon><i className="fa fa-external-link" />PERMALINK</LinkButtonWithIcon>
      <LinkButtonWithIcon><i className="fa fa-clipboard" />COPY TRACK LINK</LinkButtonWithIcon>
    </Wrapper>
  );
}

export default TrackButtonGroup;
