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

const Title = styled.h1`
  margin: 30px 20px;
  font-weight: 400;
  font-size: 2rem;
`;

function SongCardList({ title, trackIds }) {
  return (
    <div>
      {title && <Title>{title}</Title>}
      <SongCardListWrapper>
        {trackIds.map(
          trackId => trackId && <SongCard trackId={trackId} key={trackId.toString()} />,
        )}
      </SongCardListWrapper>
    </div>
  );
}

SongCardList.defaultProps = {
  title: undefined,
  trackIds: [],
};

SongCardList.propTypes = {
  title: PropTypes.string,
  trackIds: PropTypes.arrayOf(PropTypes.number),
};

export default compose(withLoadingSpinnerAfter, withFetchingOnScroll)(SongCardList);
