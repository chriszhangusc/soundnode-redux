import React from 'react';
import PropTypes from 'prop-types';
import { NotificationManager } from 'react-notifications';
import { defaultEventHandlerFactory } from 'client/utils/FactoryUtils';
import IconButton from 'client/components/Buttons/IconButton';

function createInfo(msg) {
  NotificationManager.info(msg);
}

function SongCardControls({ liked, handleToggleLike, handleCopyToClipboard }) {
  return (
    <div className="song-card-controls">
      <IconButton
        title={liked ? 'Unlike' : 'Like'}
        iconClassName={`fa fa-heart ${liked && 'active'}`}
        onClick={handleToggleLike}
      />
      <IconButton
        title="Add to playlist"
        iconClassName="fa fa-bookmark"
        onClick={() => createInfo('Added to playlist')}
      />
      <IconButton
        title="Repost"
        iconClassName="fa fa-external-link"
        onClick={() => createInfo('Added to repose')}
      />
      <IconButton
        title="Copy to clipboard"
        btnClassName="icon-button"
        iconClassName="fa fa-clipboard"
        onClick={handleCopyToClipboard}
      />
    </div>
  );
}

SongCardControls.defaultProps = {
  liked: false,
  handleCopyToClipboard: defaultEventHandlerFactory('handleCopyToClipboard'),
  handleToggleLike: defaultEventHandlerFactory('handleToggleLike'),
};

SongCardControls.propTypes = {
  liked: PropTypes.bool,
  handleToggleLike: PropTypes.func,
  handleCopyToClipboard: PropTypes.func,
};

export default SongCardControls;
