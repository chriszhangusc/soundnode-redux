import React from 'react';
import PropTypes from 'prop-types';
import SongCard from 'common/components/SongCard';
import withLoadingSpinnerAfter from 'common/hocs/withLoadingSpinnerAfter';
import withFetchingOnScroll from 'common/hocs/withFetchingOnScroll';
import { compose } from 'recompose';
import { Flex } from 'grid-styled';

function SongCardList({ trackIds }) {
  return (
    <Flex wrap mb={30}>
      {trackIds.map(trackId => trackId && <SongCard trackId={trackId} key={trackId.toString()} />)}
    </Flex>
  );
}

SongCardList.defaultProps = {
  title: '',
  trackIds: [],
};

SongCardList.propTypes = {
  trackIds: PropTypes.arrayOf(PropTypes.number),
};

export default compose(withLoadingSpinnerAfter, withFetchingOnScroll)(SongCardList);
