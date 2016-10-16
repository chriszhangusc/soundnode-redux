import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Spinner from 'client/components/Spinner';
import Track from 'client/models/Track';
import Artist from 'client/models/Artist';
import { formatPlaybacks, formatLikes, formatImageUrl } from 'client/utils/FormatUtils';
import { t500x500 } from 'client/constants/ImageConstants';
import defaultArtworkImage from 'assets/images/default-artwork.png';

const TrackDetails = ({
  artist,
  track,
  isFetching,
  isLiked,
  isPlaying,
  isActive,
  handlePlaySong,
  handlePauseSong,
  handleChangeSong,
  handleLikeClick,
  handleUnlikeClick
}) => {
  if (isFetching) {
    return <Spinner />;
  }

  let togglePlayButton = null;
  if (isActive && isPlaying) {
    togglePlayButton = (
      <button
        className="toggle-play-button"
        onClick={handlePauseSong}
      >
        <i className="toggle-play-button-icon ion-ios-pause icon-big" />
      </button>
    );
  } else {
    togglePlayButton = (
      <button
        className="toggle-play-button"
        onClick={() => {
          if (isActive) handlePlaySong();
          else handleChangeSong(track);
        }}
      >
        <i className="toggle-play-button-icon ion-ios-play icon-big" />
      </button>
    );
  }
  return (
    <div className="container">
      <div className="track-info-container">
        <div className="track-avatar">
          <div
            className="song-card-image track-image"
            style={{
              backgroundImage: `url(${formatImageUrl(track.getArtworkUrl(), t500x500)
                || defaultArtworkImage})`
            }}
          >
            { togglePlayButton }
          </div>
          <div className="image-details-bar">
            <span className="playback-count">
              <i className="fa fa-play" /> {formatPlaybacks(track.getPlaybackCount())}
            </span>
            <span className="likes-count">
              <i
                className={`fa fa-heart ${isLiked ? 'active' : ''}`}
                onClick={isLiked ? handleUnlikeClick : handleLikeClick}
              /> {formatLikes(track.getLikedCount())}
            </span>
          </div>
        </div>
        <div className="track-details">
          <h1 className="track-title">{ track.getTitle() }</h1>
          <div className="track-artist-name">
            Artist: <Link to={`/artist/${artist.getId()}`}>{ artist.getUsername() }</Link>
          </div>
          <div className="track-artist-name">Created At: {track.getCreatedAt().replace('+0000', '')}</div>
          <div className="track-description"><p>{track.getDescription()}</p></div>
          <div className="track-controls">
            <button
              className="button inline"
              onClick={isLiked ? handleUnlikeClick : handleLikeClick}
            >
              <i className={`fa fa-heart ${isLiked ? 'active' : ''}`} />
              <span>{`${isLiked ? 'UNLIKE' : 'LIKE'}`}</span>
            </button>
            <button className="button inline">
              <i className="fa fa-bookmark" /><span>ADD TO PLAYLIST</span>
            </button>
            <button className="button inline">
              <i className="fa fa-external-link" />
              <span>PERMALINK</span>
            </button>
            <button className="button inline">
              <i className="fa fa-clipboard" />
              <span>COPY TRACK LINK</span>
            </button>
          </div>
        </div>
      </div>

      <div className="comment-container">
        <div className="comment-title">
          <h4>Comments: (5321)</h4>
        </div>
        <div className="comment-list-container">
          <ul className="comment-list">
            <li className="comment-item">
              <img
                className="song-card-user-image comment-artist-avatar"
                role="presentation"
                src="https://a1.sndcdn.com/images/default_avatar_large.png"
              />
              <div className="comment-header">
                <a className="comment-artist-name">RandyJJ</a>
                <span className="comment-created-at">2016/10/15 05:18:21</span>
              </div>
              <p className="comment-body">
                Learn how you can make $10k per month using your computer (even if you're a newbie). Visit this site for more info: http://GivenDaily.com
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

TrackDetails.propTypes = {
  track: PropTypes.instanceOf(Track).isRequired,
  artist: PropTypes.instanceOf(Artist).isRequired,
  isFetching: PropTypes.bool.isRequired,
  isLiked: PropTypes.bool.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  isActive: PropTypes.bool.isRequired,
  handlePlaySong: PropTypes.func.isRequired,
  handlePauseSong: PropTypes.func.isRequired,
  handleChangeSong: PropTypes.func.isRequired,
  handleLikeClick: PropTypes.func.isRequired,
  handleUnlikeClick: PropTypes.func.isRequired
};

export default TrackDetails;
