import { connect } from 'react-redux';
import { isTrackFetching } from 'client/features/track';
import { getTrackById } from 'client/features/entities/entitiesSelectors';
import TrackDetailsLayout from '../components/TrackDetailsLayout';

const mapStateToProps = (state, { params }) => {
  const { trackId } = params;
  return {
    track: getTrackById(state, trackId),
    trackFetching: isTrackFetching(state),
  };
};

export default connect(mapStateToProps)(TrackDetailsLayout);
