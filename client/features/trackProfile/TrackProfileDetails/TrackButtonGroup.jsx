import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FONT_COLOR_PRIMARY, FONT_COLOR_SECONDARY } from 'client/app/css/colors';
import { getUserByTrackId } from 'client/features/entities/entitiesSelectors';
import { connect } from 'react-redux';
import { copyToClipboard } from 'client/features/copy';
import { getProfiledTrack } from '../trackProfileSelectors';

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

function TrackButtonGroup({ permalink, downloadUrl, handleCopyPermalink }) {
  return (
    <Wrapper>
      <LinkButtonWithIcon href={downloadUrl} target="_blank">
        <i className="fa fa-download" />DOWNLOAD
      </LinkButtonWithIcon>

      <LinkButtonWithIcon><i className="fa fa-bookmark" />ADD TO PLAYLIST</LinkButtonWithIcon>

      <LinkButtonWithIcon href={permalink} target="_blank">
        <i className="fa fa-external-link" />PERMALINK
      </LinkButtonWithIcon>

      <LinkButtonWithIcon onClick={() => handleCopyPermalink(permalink)}>
        <i className="fa fa-clipboard" />COPY TRACK LINK
      </LinkButtonWithIcon>
    </Wrapper>
  );
}

function mapStateToProps(state) {
  const track = getProfiledTrack(state);
  // console.log(user);
  return {
    downloadUrl: track && track.downloadUrl,
    permalink: track && track.permalinkUrl,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleCopyPermalink(permalink) {
      dispatch(copyToClipboard(permalink));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TrackButtonGroup);
