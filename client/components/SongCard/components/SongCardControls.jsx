import React from 'react';
import PropTypes from 'prop-types';
import { NotificationManager } from 'react-notifications';
import MagicButton from 'client/components/MagicButton';
import { defaultEventHandlerFactory } from 'client/utils/FactoryUtils';

function createInfo(msg) {
  NotificationManager.info(msg);
}

const SongCardControls = ({
  liked,
  handleToggleLike,
  handleCopyToClipboard,
}) => (
    <div className="song-card-controls">
      <MagicButton
        title={liked ? 'Unlike' : 'Like'}
        btnClassName="icon-button"
        iconClassName={`fa fa-heart ${liked && 'active'}`}
        onClick={handleToggleLike}
      />
      <MagicButton
        title="Add to playlist"
        btnClassName="icon-button"
        iconClassName="fa fa-bookmark"
        onClick={() => createInfo('Added to playlist')}
      />
      <MagicButton
        title="Repost"
        btnClassName="icon-button"
        iconClassName="fa fa-external-link"
        onClick={() => createInfo('Added to repose')}
      />
      <MagicButton
        title="Copy to clipboard"
        btnClassName="icon-button"
        iconClassName="fa fa-clipboard"
        onClick={handleCopyToClipboard}
      />
    </div>
  );

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
