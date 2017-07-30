import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { copyToClipboard } from 'features/copy';
import * as selectors from 'features/trackProfile/trackProfileSelectors';

const Wrapper = styled.div`
  display: flex;
  position: absolute;
  left: 0;
  bottom: 0;
`;

const LinkButton = styled.a`
  display: inline-block;
  border: 1px solid;
  border-radius: .25em;
  padding: 3px 6px;
  color: ${props => props.theme.fontColorSub};
  font-size: 0.75rem;
  margin-right: 10px;
  transition: all 200ms ease-in-out;
  & i {
    margin-right: 5px;
  }

  &:hover {
    cursor: pointer;
    color: ${props => props.theme.fontColor};
  }
`;

function TrackActions({ permalink, downloadable, downloadUrl, handleCopyPermalink }) {
  return (
    <Wrapper>
      {downloadable &&
        <LinkButton href={downloadUrl} target="_blank" title="Download on SoundCloud Website">
          <i className="fa fa-download" />DOWNLOAD
        </LinkButton>}

      <LinkButton to="/">
        <i className="fa fa-bookmark" title="Add to Playlist" />ADD TO PLAYLIST
      </LinkButton>

      <LinkButton href={permalink} target="_blank" title="Visit Track on SoundCloud">
        <i className="fa fa-external-link" />PERMALINK
      </LinkButton>

      <LinkButton onClick={() => handleCopyPermalink(permalink)} title="Copy Permalink">
        <i className="fa fa-clipboard" />COPY TRACK LINK
      </LinkButton>
    </Wrapper>
  );
}

TrackActions.propTypes = {
  downloadable: PropTypes.bool,
  permalink: PropTypes.string,
  downloadUrl: PropTypes.string,
  handleCopyPermalink: PropTypes.func,
};

TrackActions.defaultProps = {
  downloadable: false,
  permalink: '',
  downloadUrl: '',
  handleCopyPermalink: null,
};

function mapStateToProps(state) {
  return {
    downloadable: selectors.isProfiledTrackDownloadable(state),
    downloadUrl: selectors.getProfiledTrackDownloadUrl(state),
    permalink: selectors.getProfiledTrackPermalink(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleCopyPermalink(permalink) {
      dispatch(copyToClipboard(permalink));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TrackActions);
