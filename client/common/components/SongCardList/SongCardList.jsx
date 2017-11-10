import React from 'react';
import PropTypes from 'prop-types';
import SongCard from 'common/components/SongCard';
import withLoadingSpinnerAfter from 'common/hocs/withLoadingSpinnerAfter';
import withFetchingOnScroll from 'common/hocs/withFetchingOnScroll';
import { compose } from 'recompose';
import { Flex } from 'grid-styled';

function SongCardList({ playlist }) {
  const { trackIds } = playlist;
  return (
    <Flex wrap mb={30}>
      {trackIds.map(
        trackId =>
          trackId && <SongCard trackId={trackId} playlist={playlist} key={trackId.toString()} />,
      )}
    </Flex>
  );
}

SongCardList.propTypes = {
  playlist: PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    trackIds: PropTypes.arrayOf(PropTypes.number),
  }).isRequired,
};

export default compose(withLoadingSpinnerAfter, withFetchingOnScroll)(SongCardList);
