import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import * as selectors from 'features/trackProfile/trackProfileSelectors';
import * as playerActions from 'features/player/playerActions';
import TrackProfileDetails from './TrackProfileDetails';
import TrackProfileImage from './TrackProfileImage';

// Container components should not have styles, try to extract reusable Wrapper components
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 30px;
`;

const Section = styled.section`margin-right: 30px;`;

class TrackProfileHeader extends React.Component {
  static propTypes = {
    ...TrackProfileImage.propTypes,
    ...TrackProfileDetails.propTypes,
  };

  constructor(props) {
    super(props);
    this.handleImageClick = this.handleImageClick.bind(this);
  }

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
      <Wrapper>
        <Section>
          <TrackProfileImage
            src={artworkUrl}
            playing={playing}
            active={active}
            playbackCount={playbackCount}
            likesCount={likesCount}
            liked={liked}
            onClick={this.handleImageClick}
          />
        </Section>
        <Section>
          <TrackProfileDetails
            title={title}
            username={username}
            description={description}
            userRoute={userRoute}
          />
        </Section>
      </Wrapper>
    );
  }
}

// TrackProfileHeader.propTypes = {
//   ...TrackProfileImage.propTypes,
//   ...TrackProfileDetails.propTypes,
// };

function mapStateToProps(state) {
  return {
    // TrackProfileImage
    trackId: selectors.getProfiledTrackId(state),
    artworkUrl: selectors.getProfiledTrackArtworkUrl(state),
    playing: selectors.isProfiledTrackPlaying(state),
    active: selectors.isProfiledTrackActive(state),
    liked: selectors.isProfiledTrackLiked(state),
    likesCount: selectors.getProfiledTrackLikesCount(state),
    playbackCount: selectors.getProfiledTrackPlaybackCount(state),
    // TrackProfileInfo
    title: selectors.getProfiledTrackTitle(state),
    username: selectors.getProfiledTrackUsername(state),
    description: selectors.getProfiledTrackDescription(state),
    userRoute: selectors.getProfiledTrackUserRoute(state),
  };
}

export default connect(mapStateToProps, playerActions)(TrackProfileHeader);
