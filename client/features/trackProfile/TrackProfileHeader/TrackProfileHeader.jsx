import React from 'react';
import { connect } from 'react-redux';
import * as selectors from 'features/trackProfile/trackProfileSelectors';
import * as playerActions from 'features/player/playerActions';
import PageHeaderInfoLayout from 'common/components/layouts/PageHeaderInfoLayout';
import TrackProfileDetails from './TrackProfileDetails';
import TrackProfileImage from './TrackProfileImage';

class TrackProfileHeader extends React.Component {
  static propTypes = {
    ...TrackProfileImage.propTypes,
    ...TrackProfileDetails.propTypes,
  };

  constructor(props) {
    super(props);
    this.handleImageClick = this.handleImageClick.bind(this);
  }

  // Refactor?
  handleImageClick() {
    const { updateActiveTrackIdAndPlay, togglePlay, trackId, active } = this.props;
    if (!trackId) return;
    if (!active) {
      updateActiveTrackIdAndPlay(trackId);
    } else {
      togglePlay();
    }
  }

  render() {
    const { artworkUrl, playing, active, liked, playbackCount, likesCount } = this.props;
    const { title, username, description, userRoute } = this.props;
    return (
      <PageHeaderInfoLayout>
        <TrackProfileImage
          src={artworkUrl}
          playing={playing}
          active={active}
          playbackCount={playbackCount}
          likesCount={likesCount}
          liked={liked}
          onClick={this.handleImageClick}
        />
        <TrackProfileDetails
          title={title}
          username={username}
          description={description}
          userRoute={userRoute}
        />
      </PageHeaderInfoLayout>
    );
  }
}

// TrackProfileHeader.propTypes = {
//   ...TrackProfileImage.propTypes,
//   ...TrackProfileDetails.propTypes,
// };

function mapStateToProps(state) {
  return {
    // props for TrackProfileImage
    trackId: selectors.getProfiledTrackId(state),
    artworkUrl: selectors.getProfiledTrackArtworkUrl(state),
    playing: selectors.isProfiledTrackPlaying(state),
    active: selectors.isProfiledTrackActive(state),
    liked: selectors.isProfiledTrackLiked(state),
    likesCount: selectors.getProfiledTrackLikesCount(state),
    playbackCount: selectors.getProfiledTrackPlaybackCount(state),
    // props for TrackProfileInfo
    title: selectors.getProfiledTrackTitle(state),
    username: selectors.getProfiledTrackUsername(state),
    description: selectors.getProfiledTrackDescription(state),
    userRoute: selectors.getProfiledTrackUserRoute(state),
  };
}

export default connect(mapStateToProps, playerActions)(TrackProfileHeader);
