import { connect } from 'react-redux';

import {
  getArtistId,
  isArtistFetching,
  isArtistTracksFetching,
  getArtistById
} from 'client/redux/modules/reducers';

import ArtistDetailsLayout from '../components/ArtistDetailsLayout';

const mapStateToProps = state => {
  const artistId = getArtistId(state);
  const artist = getArtistById(state, artistId);
  return {
    fetching: isArtistFetching(state) || isArtistTracksFetching(state),
    artistId,
    trackCount: artist ? artist.getTrackCount().toLocaleString() : '0'
  };
};


export default connect(mapStateToProps)(ArtistDetailsLayout);
