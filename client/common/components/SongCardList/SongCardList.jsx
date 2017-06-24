import React from 'react';
import PropTypes from 'prop-types';
import SongCard from 'common/components/SongCard';
import withLoadingSpinnerAfter from 'common/hocs/withLoadingSpinnerAfter';
import withFetchingOnScroll from 'common/hocs/withFetchingOnScroll';
import { compose } from 'recompose';
import styled from 'styled-components';

const SongCardListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 30px;
`;

function SongCardList({ trackIds }) {
  return (
    <SongCardListWrapper>
      {trackIds.map(
        trackId =>
          trackId &&
          <SongCard trackId={trackId} key={trackId.toString()} />,
      )}
    </SongCardListWrapper>
  );
}

SongCardList.defaultProps = {
  fetching: false,
  trackIds: [],
};

SongCardList.propTypes = {
  // fetching: PropTypes.bool,
  trackIds: PropTypes.arrayOf(PropTypes.number),
};

// export default withLoadingSpinnerAfter(withFetchingOnScroll(SongCardList));
export default compose(withLoadingSpinnerAfter, withFetchingOnScroll)(SongCardList);
