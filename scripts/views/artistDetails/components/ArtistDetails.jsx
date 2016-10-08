import React, { Component, PropTypes } from 'react';
// import { loadUser } from '../../../modules/artist/actions';
import { loadUser } from 'rootDir/modules/artist/actions';
import Spinner from 'rootDir/views/common/components/Spinner';
import TrackListContainer from '../container/TrackListContainer';

class ArtistDetails extends Component {

  componentWillMount() {
    // Load user info
    const { params, dispatch } = this.props;
    const uid = params.uid;
    dispatch(loadUser(uid));
  }

  render() {
    const {
      isFetching,
      avatarUrl,
      artistName,
      followers,
      description,
      tracks
    } = this.props;

    if (isFetching) return <Spinner />;
    return (
      <div className="container">
        <div className="artist-info-container">
          <div className="artist-avatar">
            <img alt="User avatar" src={avatarUrl} />
          </div>
          <div className="artist-details">
            <h1 className="artist-name">{artistName}</h1>
            <div className="artist-followers">Followers: {followers}</div>
            <div className="artist-description">{description}</div>
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

export default ArtistDetails;
