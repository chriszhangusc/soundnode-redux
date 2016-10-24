import { connect } from 'react-redux';

import {
  getArtistId,
  isArtistFetching,
  isArtistTracksFetching
} from 'client/redux/modules/reducers';

import ArtistDetailsLayout from '../components/ArtistDetailsLayout';

const mapStateToProps = state => ({
  fetching: isArtistFetching(state) || isArtistTracksFetching(state),
  artistId: getArtistId(state)
});

export default connect(mapStateToProps)(ArtistDetailsLayout);
