import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import IconButton from 'client/components/Buttons/IconButton';
import { defaultEventHandlerFactory } from 'client/utils/FactoryUtils';
import styled from 'styled-components';
import { BACKGROUND_COLOR_SECONDARY } from 'client/css/colors';
import { PLAYLIST_WIDTH_DESKTOP, PLAYLIST_WIDTH_DESKTOP_LG, PLAYLIST_WIDTH_DESKTOP_4K } from 'client/css/variables';
import { media } from 'client/css/style-utils';
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
  playlistHidden: true,
  playlistTrackIds: [],
  handleClearPlayQueue: defaultEventHandlerFactory('handleClearPlayQueue'),
};

Playlist.propTypes = {
  playlistHidden: PropTypes.bool,
  playlistTrackIds: PropTypes.array,
  handleClearPlayQueue: PropTypes.func,
};

export default Playlist;
