import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import LinkButton from '@soundnode-redux/client/src/common/components/links/LinkButton';
import Icon from '@soundnode-redux/client/src/common/components/icons/Icon';
// import { deletePlaylist } from '@soundnode-redux/client/src/features/playlists/playlistsActions';

const ActionsWrapper = styled.div`
  display: flex;
  position: absolute;
  left: 0;
  bottom: 0;
`;

function ActionList(props) {
  const { playlist } = props;
  return (
    <ActionsWrapper>
      {/* <LinkButton onClick={() => {}} title="Like Playlist">
        <Icon iconName="heart" />LIKE
      </LinkButton> */}

      {/* <LinkButton onClick={() => {}} title="Add to Current Play Queue">
        <Icon iconName="plus" />ADD TO PLAY QUEUE
      </LinkButton> */}

      <LinkButton href={playlist.permalinkUrl} target="_blank" title="Visit Playlist on SoundCloud">
        <Icon iconName="external-link" />PERMALINK
      </LinkButton>

      {/* <LinkButton onClick={() => handleDeletePlaylist(playlist.id)} title="Delete Playlist">
        <Icon iconName="remove" />DELETE
      </LinkButton> */}
    </ActionsWrapper>
  );
}

const actions = {
  // handleDeletePlaylist: deletePlaylist,
};

export default connect(null, actions)(ActionList);
