import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SongCardButton from './SongCardButton';

const Wrapper = styled.div`
  margin-top: 10px;
`;

function SongCardControls({
  liked,
  reposted,
  handleToggleLike,
  handleRepost,
  handleCopyToClipboard,
}) {
  return (
    <Wrapper>
      <SongCardButton
        tooltipText={liked ? 'Unlike' : 'Like'}
        name="heart"
        active={liked}
        onClick={(e) => {
          e.stopPropagation();
          handleToggleLike();
        }}
      />
      <SongCardButton tooltipText="Add to playlist" name="bookmark" onClick={() => {}} />
      <SongCardButton
        tooltipText="Repost"
        name="retweet"
        active={reposted}
        onClick={(e) => {
          e.stopPropagation();
          handleRepost();
        }}
      />
      <SongCardButton
        tooltipText="Copy permalink"
        name="clipboard"
        onClick={handleCopyToClipboard}
      />
    </Wrapper>
  );
}

SongCardControls.propTypes = {
  liked: PropTypes.bool.isRequired,
  reposted: PropTypes.bool.isRequired,
  handleToggleLike: PropTypes.func.isRequired,
  handleRepost: PropTypes.func.isRequired,
  handleCopyToClipboard: PropTypes.func.isRequired,
};

export default SongCardControls;
