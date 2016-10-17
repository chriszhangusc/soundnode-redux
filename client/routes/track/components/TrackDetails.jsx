import React, { PropTypes } from 'react';
import LikeButton from 'client/components/LikeButton';
import CommentMap from 'client/models/CommentMap';
import { Link } from 'react-router';
import Spinner from 'client/components/Spinner';
import Track from 'client/models/Track';
import { formatPlaybacks, formatLikes, formatImageUrl } from 'client/utils/FormatUtils';
import { t500x500 } from 'client/constants/ImageConstants';
import defaultArtworkImage from 'assets/images/default-artwork.png';
import defaultArtistImage from 'assets/images/default-artist.png';

const TrackDetails = ({
  track,
  isTrackFetching,
  isCommentsFetching,
  comments,
  isLiked,
  isPlaying,
  isActive,
  handlePlaySong,
  handlePauseSong,
  handleChangeSong,
  handleLikeClick,
  handleUnlikeClick
}) => {
  if (isTrackFetching) return <Spinner />;

  const artist = track.getArtist();

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
              <LikeButton
                btnClassName="icon-button"
                isLiked={isLiked}
                handleLikeClick={handleLikeClick}
                handleUnlikeClick={handleUnlikeClick}
              />
              {formatLikes(track.getLikedCount())}
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
            <LikeButton
              isLiked={isLiked}
              btnClassName="button inline"
              onClick={isLiked ? handleUnlikeClick : handleLikeClick}
              btnText={isLiked ? 'UNLIKE' : 'LIKE'}
            />
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

      <div className="comments-container">
        <div className="comment-title">
          <h4>Comments: ({track.getCommentCount()})</h4>
        </div>
        <div className="comment-list-container">
          <ul className="comment-list">
            {comments.valueSeq().map(comment => (<li className="comment-item" key={comment.getId()}>
              <img
                className="song-card-user-image comment-artist-avatar"
                role="presentation"
                onError={(e) => {
                  e.target.src = defaultArtistImage;
                }}
                src={comment.getArtist().getAvatarUrl() || defaultArtistImage}
              />
              <div>
                <div className="comment-header">
                  <a className="comment-artist-name">{comment.getArtist().getUsername()}</a>
                  <span className="comment-created-at">{comment.getCreatedAt()}</span>
                </div>
                <p className="comment-body">
                  {comment.getCommentBody()}
                </p>
              </div>
            </li>))}
          </ul>
        </div>
      </div>
    </div>
  );
};

TrackDetails.propTypes = {
  track: PropTypes.instanceOf(Track).isRequired,
  comments: PropTypes.instanceOf(CommentMap).isRequired,
  isTrackFetching: PropTypes.bool.isRequired,
  isCommentsFetching: PropTypes.bool.isRequired,
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
