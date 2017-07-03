import React from 'react';
import PropTypes from 'prop-types';
import { getTracksByPlaylistId } from 'features/entities/entitiesSelectors';
import Image from 'common/components/images/Image';
import { connect } from 'react-redux';
import { getLargeVersion } from 'common/utils/imageUtils';
import Card from 'common/components/Card';

function PlaylistCardImage({ playlistCoverImage }) {
  return (
    <Card.ImageWrapper>
      <Image src={playlistCoverImage} />
    </Card.ImageWrapper>
  );
}

PlaylistCardImage.propTypes = {
  playlistCoverImage: PropTypes.string,
};

// { active, playing, imageUrl, handleImageClick }
function mapStateToProps(state, { playlistId }) {
  const tracks = getTracksByPlaylistId(state, playlistId);
  return {
    playlistCoverImage: tracks && getLargeVersion(tracks[0].artworkUrl),
  };
}

export default connect(mapStateToProps)(PlaylistCardImage);
