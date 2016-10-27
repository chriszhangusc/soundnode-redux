import { connect } from 'react-redux';

import {
  getArtistId,
  isArtistFetching,
  isTracksFetching,
} from 'client/redux/modules/artist';

import { getArtistById } from 'client/redux/modules/entities';

import ArtistDetailsLayout from '../components/ArtistDetailsLayout';

const mapStateToProps = (state) => {
  const artistId = getArtistId(state);
  const artist = getArtistById(state, artistId);
  return {
    fetching: isArtistFetching(state) || isTracksFetching(state),
    artistId,
    trackCount: artist ? artist.get('trackCount').toLocaleString() : '0'
  };
};


export default connect(mapStateToProps)(ArtistDetailsLayout);
