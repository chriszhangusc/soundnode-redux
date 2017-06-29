import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { BACKGROUND_COLOR, BOX_SHADOW_COLOR, THEME_COLOR } from 'app/css/colors';
import { getLargeVersion } from 'common/utils/imageUtils';
import MaterialCardDetails from './MaterialCardDetails';
import MaterialCardControls from './MaterialCardControls';
import MaterialCardImage from './MaterialCardImage';

const MaterialCardWrapper = styled.div`
  background-color: ${BACKGROUND_COLOR};
  box-shadow: 0 0 12px 8px ${BOX_SHADOW_COLOR};
  padding: 11px;
  width: 230px;
  margin: 10px 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 1px solid ${props => (props.active ? THEME_COLOR : 'transparent')};
`;

function getPlaylistCoverImage(playlist) {
  return getLargeVersion(playlist.tracks[0].artwork_url);
}

function getPlaylistTitle(playlist) {
  return playlist.title;
}

function getPlaylistUserAvatar(playlist) {
  return playlist.user.avatar_url;
}

function getPlaylistUsername(playlist) {
  return playlist.user.username;
}

function MaterialCard({ playlist, active }) {
  return (
    <MaterialCardWrapper active={active}>
      <MaterialCardImage
        active={active}
        playing={false}
        artworkUrl={getPlaylistCoverImage(playlist)}
      />
      <MaterialCardDetails
        title={getPlaylistTitle(playlist)}
        userAvatar={getPlaylistUserAvatar(playlist)}
        username={getPlaylistUsername(playlist)}
      />
      <MaterialCardControls />
    </MaterialCardWrapper>
  );
}

MaterialCard.defaultProps = {
  playlist: null,
  active: false,
};

MaterialCard.propTypes = {
  playlist: PropTypes.object,
  active: PropTypes.bool.isRequired,
};

export default MaterialCard;
