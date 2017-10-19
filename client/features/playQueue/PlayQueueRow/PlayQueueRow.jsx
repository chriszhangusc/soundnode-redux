import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTrackById, getUserByTrackId } from 'features/entities/entitiesSelectors';
import { isTrackActive } from 'features/player/playerSelectors';
import { loadTrackAndPlay } from 'features/player/playerActions';
import TrackImage from 'common/components/images/TrackImage';
import ColumnTitleWrapper from 'common/components/layouts/ColumnTitleWrapper';
import Wrapper from './Wrapper';
import PlayQueueTooltips from './PlayQueueTooltips';
import PlayQueueItemTitle from './PlayQueueItemTitle';
import PlayQueueItemArtist from './PlayQueueItemArtist';

function PlayQueueRow({
  title,
  artworkUrl,
  artistName,
  trackId,
  active,
  index,
  handleTogglePlayback,
}) {
  const handleDoubleClick = () => {
    if (!active) handleTogglePlayback(trackId);
  };

  return (
    <Wrapper active={active} onDoubleClick={handleDoubleClick}>
      <TrackImage src={artworkUrl} size="tiny" />
      <ColumnTitleWrapper>
        <PlayQueueItemTitle>
          {title}
        </PlayQueueItemTitle>
        <PlayQueueItemArtist>
          By: {artistName}
        </PlayQueueItemArtist>
      </ColumnTitleWrapper>
      <PlayQueueTooltips index={index} trackId={trackId} />
    </Wrapper>
  );
}

function mapStateToProps(state, { trackId }) {
  const { title, artworkUrl } = getTrackById(state, trackId);
  const { username } = getUserByTrackId(state, trackId);
  return {
    artworkUrl,
    active: isTrackActive(state, trackId),
    title,
    artistName: username,
  };
}

const mapDispatchToProps = {
  handleTogglePlayback: loadTrackAndPlay,
};

const Connected = connect(mapStateToProps, mapDispatchToProps)(PlayQueueRow);

const injectedProps = {
  handleTogglePlayback: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  artistName: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
};

const passedInProps = {
  index: PropTypes.number.isRequired,
  trackId: PropTypes.number.isRequired,
};

PlayQueueRow.propTypes = {
  ...passedInProps,
  ...injectedProps,
};

Connected.propTypes = passedInProps;

export default Connected;
