import React from 'react';
import PropTypes from 'prop-types';
import Fixed from 'common/components/Fixed';
import { media } from 'app/css/styleUtils';
import PlaylistRow from '../PlaylistRow';
import PlaylistHeader from '../PlaylistHeader';

const PLAYLIST_WIDTH_DESKTOP = '300px';
const PLAYLIST_WIDTH_DESKTOP_LG = '400px';
const PLAYLIST_WIDTH_DESKTOP_4K = '500px';

const PlaylistWrapper = Fixed.extend`
  ${media.desktop`
    width: ${PLAYLIST_WIDTH_DESKTOP};
    transform: translateX${props => (props.playlistHidden ? PLAYLIST_WIDTH_DESKTOP : '0')};
  `};

  ${media.desktopLG`
    width: ${PLAYLIST_WIDTH_DESKTOP_LG};
    transform: translateX${props => (props.playlistHidden ? PLAYLIST_WIDTH_DESKTOP_LG : '0')};
  `};

  ${media.desktop4K`
    width: ${PLAYLIST_WIDTH_DESKTOP_4K};
    transform: translateX${props => (props.playlistHidden ? PLAYLIST_WIDTH_DESKTOP_4K : '0')};
  `};

  top: 70px;
  right: 0;
  bottom: 0;
  z-index: ${props => props.theme.zIndexes[1]};
  padding: 20px 0 0 0;
  overflow-x: hidden;
  overflow-y: scroll;
  transform: translateX(${props => (props.playlistHidden ? '500px' : '0')});
  background-color: ${props => props.theme.colors.bgSub};
  transition: all .5s ease-in-out;
`;

function Playlist(props) {
  const { playlistTrackIds } = props;
  // Do not forget to pass down props to styled components if necessary.
  return (
    <PlaylistWrapper {...props}>
      <PlaylistHeader {...props} />
      <ul className="playlist-list">
        {playlistTrackIds.map(
          (trackId, idx) =>
            trackId && <PlaylistRow trackId={trackId} index={idx + 1} key={trackId.toString()} />,
        )}
      </ul>
    </PlaylistWrapper>
  );
}

Playlist.defaultProps = {
  playlistTrackIds: [],
};

Playlist.propTypes = {
  playlistTrackIds: PropTypes.arrayOf(PropTypes.number),
};

export default Playlist;
