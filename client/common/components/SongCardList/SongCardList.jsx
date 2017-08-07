import React from 'react';
import PropTypes from 'prop-types';
import SongCard from 'common/components/SongCard';
import withLoadingSpinnerAfter from 'common/hocs/withLoadingSpinnerAfter';
import withFetchingOnScroll from 'common/hocs/withFetchingOnScroll';
import { compose } from 'recompose';
import Title from 'common/components/Title';
import { Flex } from 'grid-styled';

function SongCardList({ title, trackIds }) {
  return (
    <div>
      <Title>
        {title}
      </Title>
      <Flex wrap mb="30px">
        {trackIds.map(
          trackId => trackId && <SongCard trackId={trackId} key={trackId.toString()} />,
        )}
      </Flex>
    </div>
  );
}

SongCardList.defaultProps = {
  title: '',
  trackIds: [],
};

SongCardList.propTypes = {
  title: PropTypes.string,
  trackIds: PropTypes.arrayOf(PropTypes.number),
};

export default compose(withLoadingSpinnerAfter, withFetchingOnScroll)(SongCardList);
