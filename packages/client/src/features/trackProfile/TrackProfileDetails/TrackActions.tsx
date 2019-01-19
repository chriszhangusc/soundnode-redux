import * as React from 'react';
import styled from 'styled-components';
import LinkButton from '@soundnode-redux/client/src/common/components/links/LinkButton';
import Icon from '@soundnode-redux/client/src/common/components/icons/Icon';

const Wrapper = styled.div`
  display: flex;
  position: absolute;
  left: 0;
  bottom: 0;
`;

function TrackActions({ track, permalink = '', downloadable = false, downloadUrl = '', actions }) {
  return (
    <Wrapper>
      {downloadable && (
        <LinkButton href={downloadUrl} target="_blank" title="Download on SoundCloud Website">
          <Icon iconName="download" title="Download" />
          DOWNLOAD
        </LinkButton>
      )}

      <LinkButton
        to="/"
        onClick={() => {
          actions.showAddToPlaylistModal(track.id);
        }}
      >
        <Icon iconName="bookmark" title="Add to Playlist" />
        ADD TO PLAYLIST
      </LinkButton>

      <LinkButton href={permalink} target="_blank" title="Visit Track on SoundCloud">
        <Icon iconName="external-link" />
        PERMALINK
      </LinkButton>

      <LinkButton onClick={() => actions.copyToClipboard(permalink)} title="Copy Permalink">
        <Icon iconName="clipboard" title="Copy track link to clipboard" />
        COPY TRACK LINK
      </LinkButton>
    </Wrapper>
  );
}

export default TrackActions;
