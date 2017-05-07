import { connect } from 'react-redux';
import { isTrackFetching } from 'client/redux/modules/track';
import { getTrackById } from 'client/redux/modules/entities/selectors';
import TrackDetailsLayout from '../components/TrackDetailsLayout';

const mapStateToProps = (state, { params }) => {
  const { trackId } = params;
  return {
    track: getTrackById(state, trackId),
    trackFetching: isTrackFetching(state),
  };
};

export default connect(mapStateToProps)(TrackDetailsLayout);
