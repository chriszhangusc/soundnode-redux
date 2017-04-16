import React from 'react';
import PropTypes from 'prop-types';
import { NotificationManager } from 'react-notifications';
import { defaultEventHandlerFactory } from 'client/utils/FactoryUtils';
import IconButton from 'client/components/Buttons/IconButton';
import FontAwesomeButton from 'client/components/Buttons/FontAwesomeButton';
import styles from './SongCard.css';

function createInfo(msg) {
  NotificationManager.info(msg);
}

function SongCardControls({ liked, handleToggleLike, handleCopyToClipboard }) {
  return (
    <div className="song-card-controls">
      <FontAwesomeButton
        title={liked ? 'Unlike' : 'Like'}
        name="heart"
        active={liked}
        onClick={handleToggleLike}
      />
      <FontAwesomeButton
        title="Add to playlist"
        name="bookmark"
        onClick={() => createInfo('Added to playlist')}
      />
      <FontAwesomeButton
        title="Repost"
        name="external-link"
        onClick={() => createInfo('Added to repose')}
      />
      <FontAwesomeButton
        title="Copy to clipboard"
        name="clipboard"
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
