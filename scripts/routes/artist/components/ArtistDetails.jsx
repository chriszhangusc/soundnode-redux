import React, { Component, PropTypes } from 'react';
import { loadUser } from 'client/modules/artist/actions';
import Spinner from 'client/components/Spinner';
import TrackListContainer from 'client/routes/artist/container/TrackListContainer';
import Artist from 'client/models/Artist';
import { formatImageUrl } from 'client/utils/FormatUtils';
import { t500x500 } from 'client/constants/ImageConstants';

class ArtistDetails extends Component {

  componentWillMount() {
    // Load user info
    const { params, dispatch } = this.props;
    const uid = params.uid;
    dispatch(loadUser(uid));
  }

  render() {
    const {
      artist,
      isFetching
    } = this.props;

    if (isFetching) return <Spinner />;
    return (
      <div className="container">
        <div className="artist-info-container">
          <div className="artist-avatar">
            <img alt="User avatar" src={formatImageUrl(artist.getAvatarUrl(), t500x500)} />
          </div>
          <div className="artist-details">
            <h1 className="artist-name">{artist.getUsername()}</h1>
            <div className="artist-followers">Followers: {artist.getFollowersCount()}</div>
            <div className="artist-description">{artist.getDescription()}</div>
          </div>
        </div>

        <div className="artist-tracks-container">
          <div className="artist-tracks-title">
            <h3>Tracks:</h3>
            <TrackListContainer />
          </div>
        </div>
      </div>
    );
  }
}

ArtistDetails.propTypes = {
  dispatch: PropTypes.func,
  artist: PropTypes.instanceOf(Artist).isRequired,
  isFetching: PropTypes.bool.isRequired
};

export default ArtistDetails;
