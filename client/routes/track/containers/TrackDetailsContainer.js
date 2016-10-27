import { connect } from 'react-redux';
import {
  isTrackFetching,
  isTrackCommentsFetching
} from 'client/redux/modules/track';
import { getTrackById } from 'client/redux/modules/entities';
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
