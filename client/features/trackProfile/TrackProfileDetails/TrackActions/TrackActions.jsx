import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LinkButton from 'common/components/links/LinkButton';
import { copyToClipboard } from 'features/copy/copyActions';
import * as selectors from 'features/trackProfile/trackProfileSelectors';
import Icon from 'common/components/icons/Icon';
import { showAddToPlaylistModal } from 'features/modals/addToPlaylist/addToPlaylistActions';
import Wrapper from './Wrapper';

function TrackActions({ track, permalink, downloadable, downloadUrl, actions }) {
  return (
    <Wrapper>
      {downloadable && (
        <LinkButton href={downloadUrl} target="_blank" title="Download on SoundCloud Website">
          <Icon iconName="download" title="Download" />DOWNLOAD
        </LinkButton>
      )}

      <LinkButton
        to="/"
        onClick={() => {
          actions.showAddToPlaylistModal(track.id);
        }}
      >
        <Icon iconName="bookmark" title="Add to Playlist" />ADD TO PLAYLIST
      </LinkButton>

      <LinkButton href={permalink} target="_blank" title="Visit Track on SoundCloud">
        <Icon iconName="external-link" />PERMALINK
      </LinkButton>

      <LinkButton onClick={() => actions.copyToClipboard(permalink)} title="Copy Permalink">
        <Icon iconName="clipboard" title="Copy track link to clipboard" />COPY TRACK LINK
      </LinkButton>
    </Wrapper>
  );
}

TrackActions.propTypes = {
  downloadable: PropTypes.bool,
  permalink: PropTypes.string,
  downloadUrl: PropTypes.string,
  actions: PropTypes.object,
};

TrackActions.defaultProps = {
  downloadable: false,
  permalink: '',
  downloadUrl: '',
};

function mapStateToProps(state) {
  return {
    track: selectors.getProfiledTrack(state),
    downloadable: selectors.isProfiledTrackDownloadable(state),
    downloadUrl: selectors.getProfiledTrackDownloadUrl(state),
    permalink: selectors.getProfiledTrackPermalink(state),
  };
}

const actions = {
  copyToClipboard,
  showAddToPlaylistModal,
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TrackActions);
