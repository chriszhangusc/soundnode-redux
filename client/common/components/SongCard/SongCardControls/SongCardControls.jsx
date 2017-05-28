import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SongCardButton from './SongCardButton';

const Wrapper = styled.div`
  margin-top: 10px;
`;

function SongCardControls({ liked, handleToggleLike, handleCopyToClipboard }) {
  return (
    <Wrapper>
      <SongCardButton
        title={liked ? 'Unlike' : 'Like'}
        name="heart"
        active={liked}
        onClick={handleToggleLike}
      />
      <SongCardButton
        title="Add to playlist"
        name="bookmark"
        onClick={() => {}}
      />
      <SongCardButton
        title="Repost"
        name="external-link"
        onClick={() => {}}
      />
      <SongCardButton title="Copy to clipboard" name="clipboard" onClick={handleCopyToClipboard} />
    </Wrapper>
  );
}

SongCardControls.propTypes = {
  liked: PropTypes.bool.isRequired,
  handleToggleLike: PropTypes.func.isRequired,
  handleCopyToClipboard: PropTypes.func.isRequired,
};

export default SongCardControls;
