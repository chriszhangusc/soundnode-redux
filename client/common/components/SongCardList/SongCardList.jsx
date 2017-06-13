import React from 'react';
import PropTypes from 'prop-types';
import SongCard from 'client/common/components/SongCard';
import withLoadingSpinnerAfter from 'client/common/hocs/withLoadingSpinnerAfter';
import withFetchingOnScroll from 'client/common/hocs/withFetchingOnScroll';
import styled from 'styled-components';

const SongCardListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 30px;
`;

function SongCardList({ trackIds, playlistName }) {
  return (
    <SongCardListWrapper>
      {trackIds.map(
        trackId =>
          trackId &&
          <SongCard trackId={trackId} playlistName={playlistName} key={trackId.toString()} />,
      )}
    </SongCardListWrapper>
  );
}

SongCardList.defaultProps = {
  fetching: false,
  playlistName: '',
  trackIds: [],
};

SongCardList.propTypes = {
  fetching: PropTypes.bool,
  trackIds: PropTypes.arrayOf(PropTypes.number),
  playlistName: PropTypes.string,
};

export default withLoadingSpinnerAfter(withFetchingOnScroll(SongCardList));
