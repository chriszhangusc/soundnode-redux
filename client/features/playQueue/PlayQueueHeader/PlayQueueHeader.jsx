import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'common/components/buttons/IconButton';
import Wrapper from './Wrapper';
import TitleColumn from './TitleColumn';
import IconWrapper from './IconWrapper';

function PlayQueueHeader({ handleClearPlayQueue }) {
  return (
    <Wrapper>
      <TitleColumn>TRACKS</TitleColumn> | <TitleColumn>ARTIST</TitleColumn>
      <IconWrapper>
        <IconButton
          title="Clear play queue"
          iconName="trash"
          onClick={handleClearPlayQueue}
        />
      </IconWrapper>
    </Wrapper>
  );
}

PlayQueueHeader.propTypes = {
  handleClearPlayQueue: PropTypes.func.isRequired,
};

export default PlayQueueHeader;
