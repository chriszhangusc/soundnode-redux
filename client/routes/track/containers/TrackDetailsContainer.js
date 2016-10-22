import { connect } from 'react-redux';
import {
  getTrackById,
  isTrackFetching,
  isTrackCommentsFetching
} from 'client/redux/modules/reducers';
import TrackDetailsLayout from '../components/TrackDetailsLayout';

const mapStateToProps = (state, { params }) => {
  const { trackId } = params;
  return {
    track: getTrackById(state, trackId),
    trackFetching: isTrackFetching(state),
    commentsFetching: isTrackCommentsFetching(state)
  };
};

export default connect(mapStateToProps)(TrackDetailsLayout);
