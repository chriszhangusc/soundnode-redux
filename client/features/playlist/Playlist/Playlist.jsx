import React from 'react';
import PropTypes from 'prop-types';
// import IconButton from 'client/common/components/buttons/IconButton';
import styled from 'styled-components';
import { BACKGROUND_COLOR_SECONDARY } from 'client/app/css/colors';

import { media } from 'client/app/css/styleUtils';
import PlaylistRow from '../PlaylistRow';
import PlaylistHeader from '../PlaylistHeader';

const PLAYLIST_WIDTH_DESKTOP = '300px';
const PLAYLIST_WIDTH_DESKTOP_LG = '400px';
const PLAYLIST_WIDTH_DESKTOP_4K = '500px';

const PlaylistWrapper = styled.div`
    ${media.desktop`
      width: ${PLAYLIST_WIDTH_DESKTOP};
      transform: translateX${props => (props.playlistHidden ? PLAYLIST_WIDTH_DESKTOP : '0')};
    `}

    ${media.desktopLG`
      width: ${PLAYLIST_WIDTH_DESKTOP_LG};
      transform: translateX${props => (props.playlistHidden ? PLAYLIST_WIDTH_DESKTOP_LG : '0')};
    `}

    ${media.desktop4K`
      width: ${PLAYLIST_WIDTH_DESKTOP_4K};
      transform: translateX${props => (props.playlistHidden ? PLAYLIST_WIDTH_DESKTOP_4K : '0')};
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
    transform: translateX(${props => (props.playlistHidden ? '500px' : '0')});
    background-color: ${BACKGROUND_COLOR_SECONDARY};
    transition: all .5s ease-in-out;
`;

function Playlist(props) {
  const { playlistTrackIds, handleClearPlayQueue } = props;
  // Do not forget to pass down props to styled components if necessary.
  return (
    <PlaylistWrapper {...props}>
      <PlaylistHeader {...props} />
      <ul className="playlist-list">
        {playlistTrackIds &&
          playlistTrackIds.map((trackId, idx) => (
            <PlaylistRow trackId={trackId} index={idx + 1} key={trackId.toString()} />
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
