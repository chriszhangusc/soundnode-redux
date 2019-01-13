import React from 'react';
import PropTypes from 'prop-types';
import SongCard from '@soundnode-redux/client/src/common/components/SongCard';
import withLoadingSpinnerAfter from '@soundnode-redux/client/src/common/hocs/withLoadingSpinnerAfter';
import withFetchingOnScroll from '@soundnode-redux/client/src/common/hocs/withFetchingOnScroll';
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
