import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
// import IconButton from 'client/common/components/Buttons/IconButton';

import styled from 'styled-components';
import { BACKGROUND_COLOR_SECONDARY } from 'client/app/css/colors';
import { PLAYLIST_WIDTH_DESKTOP, PLAYLIST_WIDTH_DESKTOP_LG, PLAYLIST_WIDTH_DESKTOP_4K } from 'client/app/css/variables';
import { media } from 'client/app/css/styleUtils';
import PlaylistItemContainer from '../containers/PlaylistItemContainer';
import PlaylistTitle from './PlaylistTitle';

const PlaylistWrapper = styled.div`
    width: 350px;
    ${media.desktop`
      width: ${PLAYLIST_WIDTH_DESKTOP};
      transform: ${props => (props.playlistHidden ? `translateX(${PLAYLIST_WIDTH_DESKTOP})` : 'translateX(0)')};
    `}

    ${media.desktopLG`
      width: ${PLAYLIST_WIDTH_DESKTOP_LG};
      transform: ${props => (props.playlistHidden ? `translateX(${PLAYLIST_WIDTH_DESKTOP_LG})` : 'translateX(0)')};
    `}

    ${media.desktop4K`
      width: ${PLAYLIST_WIDTH_DESKTOP_4K};
      transform: ${props => (props.playlistHidden ? `translateX(${PLAYLIST_WIDTH_DESKTOP_4K})` : 'translateX(0)')};
    `}
    position: fixed;
    top: 70px;
    right: 0;
    bottom: 0;
    z-index: 1000;
    display: block;
    padding: 20px 0 0 0;
    overflow-x: hidden;
    overflow-y: scroll;
    transform: ${props => (props.playlistHidden ? 'translateX(500px)' : 'translateX(0)')};
    background-color: ${BACKGROUND_COLOR_SECONDARY};
    transition: all .5s ease-in-out;
`;

function Playlist(props) {
  const { playlistTrackIds, handleClearPlayQueue } = props;
  // Do not forget to pass down props to styled components if necessary.
  return (
    <PlaylistWrapper {...props}>
      <PlaylistTitle {...props} />
      <ul className="playlist-list">
        {playlistTrackIds &&
          playlistTrackIds.map((trackId, idx) => (
            <PlaylistItemContainer trackId={trackId} index={idx + 1} key={shortid.generate()} />
          ))}
      </ul>
    </PlaylistWrapper>
  );
}

Playlist.defaultProps = {
  playlistTrackIds: [],
};

Playlist.propTypes = {
  playlistHidden: PropTypes.bool.isRequired,
  playlistTrackIds: PropTypes.arrayOf(PropTypes.number),
  handleClearPlayQueue: PropTypes.func.isRequired,
};

export default Playlist;
