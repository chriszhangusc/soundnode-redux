import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import SongCard from '@soundnode-redux/client/src/common/components/SongCard';
import withLoadingSpinnerAfter from '@soundnode-redux/client/src/common/hocs/withLoadingSpinnerAfter';
import withFetchingOnScroll from '@soundnode-redux/client/src/common/hocs/withFetchingOnScroll';
import { compose } from 'recompose';

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 30px;
`;

function SongCardList({ playlist }) {
  const { trackIds } = playlist;

  return (
    <Wrapper>
      {trackIds.map(
        trackId =>
          trackId && <SongCard trackId={trackId} playlist={playlist} key={trackId.toString()} />,
      )}
    </Wrapper>
  );
}

SongCardList.propTypes = {
  playlist: PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    trackIds: PropTypes.arrayOf(PropTypes.number),
  }).isRequired,
};

export default compose(
  withLoadingSpinnerAfter,
  withFetchingOnScroll,
)(SongCardList);
