import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getArtistId, isArtistFetching, loadArtistPage, clearArtistState } from 'client/redux/modules/artist';
import { getArtistById } from 'client/redux/modules/entities';
import Spinner from 'client/components/Spinner';

import ArtistDetailsPage from '../components/ArtistDetailsPage';

class ArtistDetailsPageContainer extends Component {

  componentWillMount() {
    const { dispatch, match } = this.props;
    const artistId = match.params.artistId;
    dispatch(loadArtistPage(artistId));
  }

  // componentWillReceiveProps(newProps) {

  // }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(clearArtistState());
  }

  render() {
    return (
      <div>
        {this.props.artistId && <ArtistDetailsPage {...this.props} />}
        {this.props.fetching && <Spinner />}
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  const artistId = getArtistId(state);
  const artist = getArtistById(state, artistId);
  return {
    fetching: isArtistFetching(state),
    artistId,
    trackCount: artist ? artist.trackCount.toLocaleString() : '0',
  };
};

ArtistDetailsPageContainer.propTypes = {
  match: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  artistId: PropTypes.number,
  fetching: PropTypes.bool,
};

ArtistDetailsPageContainer.defaultProps = {
  artistId: undefined,
  fetching: false,
};

export default connect(mapStateToProps)(ArtistDetailsPageContainer);
