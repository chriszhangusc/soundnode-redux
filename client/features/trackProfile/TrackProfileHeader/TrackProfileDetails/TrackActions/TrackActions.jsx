import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LinkButton from 'common/components/links/LinkButton';
import { copyToClipboard } from 'features/copy/copyActions';
import * as selectors from 'features/trackProfile/trackProfileSelectors';
import Icon from 'common/components/icons/Icon';
import Wrapper from './Wrapper';

function TrackActions({ permalink, downloadable, downloadUrl, handleCopyClick }) {
  return (
    <Wrapper>
      {downloadable && (
        <LinkButton href={downloadUrl} target="_blank" title="Download on SoundCloud Website">
          <Icon iconName="download" title="Download" />DOWNLOAD
        </LinkButton>
      )}

      <LinkButton to="/">
        <Icon iconName="bookmark" title="Add to Playlist" />ADD TO PLAYLIST
      </LinkButton>

      <LinkButton href={permalink} target="_blank" title="Visit Track on SoundCloud">
        <Icon iconName="external-link" />PERMALINK
      </LinkButton>

      <LinkButton onClick={() => handleCopyClick(permalink)} title="Copy Permalink">
        <Icon iconName="clipboard" title="Copy track link to clipboard" />COPY TRACK LINK
      </LinkButton>
    </Wrapper>
  );
}

TrackActions.propTypes = {
  downloadable: PropTypes.bool,
  permalink: PropTypes.string,
  downloadUrl: PropTypes.string,
  handleCopyClick: PropTypes.func.isRequired,
};

TrackActions.defaultProps = {
  downloadable: false,
  permalink: '',
  downloadUrl: '',
};

function mapStateToProps(state) {
  return {
    downloadable: selectors.isProfiledTrackDownloadable(state),
    downloadUrl: selectors.getProfiledTrackDownloadUrl(state),
    permalink: selectors.getProfiledTrackPermalink(state),
  };
}

export default connect(mapStateToProps, { handleCopyClick: copyToClipboard })(TrackActions);
