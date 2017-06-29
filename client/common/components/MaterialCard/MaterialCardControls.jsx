import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import MaterialCardButton from './MaterialCardButton';

const Wrapper = styled.div`
  margin-top: 10px;
`;

function MaterialCardControls({
  liked,
  reposted,
  handleToggleLike,
  handleRepost,
  handleCopyToClipboard,
}) {
  return (
    <Wrapper>
      <MaterialCardButton
        tooltipText={liked ? 'Unlike' : 'Like'}
        name="heart"
        active={liked}
        onClick={(e) => {
          e.stopPropagation();
          handleToggleLike();
        }}
      />
      <MaterialCardButton tooltipText="Add to playlist" name="bookmark" onClick={() => {}} />
      <MaterialCardButton
        tooltipText="Repost"
        name="retweet"
        active={reposted}
        onClick={(e) => {
          e.stopPropagation();
          handleRepost();
        }}
      />
      <MaterialCardButton
        tooltipText="Copy permalink"
        name="clipboard"
        onClick={handleCopyToClipboard}
      />
    </Wrapper>
  );
}

MaterialCardControls.propTypes = {
  liked: PropTypes.bool,
  reposted: PropTypes.bool,
  handleToggleLike: PropTypes.func,
  handleRepost: PropTypes.func,
  handleCopyToClipboard: PropTypes.func,
};

export default MaterialCardControls;
