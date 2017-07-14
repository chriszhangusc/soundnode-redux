import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'common/components/buttons/IconButton';
import styled from 'styled-components';

const PlaylistHeaderWrapper = styled.div`
  margin-bottom: 10px;
  text-align: center;
  color: ${props => props.theme.fontColorSub};
  font-size: 1.1rem;
`;

const TitleColumn = styled.div`
  display: inline-block;
  margin: 10px;
`;

const PlaylistHeaderIconContainer = styled.div`
  display: inline-block;
  margin-right: 12px;
  float: right;
`;

function PlaylistHeader({ handleClearPlayQueue }) {
  return (
    <PlaylistHeaderWrapper>
      <TitleColumn>TRACKS</TitleColumn> | <TitleColumn>ARTIST</TitleColumn>
      <PlaylistHeaderIconContainer>
        <IconButton
          title="Clear play queue"
          btnClassName=""
          iconClassName="fa fa-trash"
          onClick={handleClearPlayQueue}
        />
      </PlaylistHeaderIconContainer>
    </PlaylistHeaderWrapper>
  );
}

PlaylistHeader.propTypes = {
  handleClearPlayQueue: PropTypes.func.isRequired,
};

export default PlaylistHeader;
