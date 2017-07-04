import { connect } from 'react-redux';
import { getTrackById, getUserByTrackId } from 'features/entities/entitiesSelectors';
import { TRACK_PROFILE_ROUTE } from 'common/constants/routeConsts';
import DropdownSearchResultsRow from './DropdownSearchResultsRow';

function mapStateToProps(state, { trackId }) {
  const track = getTrackById(state, trackId);
  const user = getUserByTrackId(state, trackId);
  return {
    type: 'track',
    avatarUrl: track && track.artworkUrl,
    linkUrl: `${TRACK_PROFILE_ROUTE}/${trackId}`,
    title: track && track.title,
    subtitle: `Track by ${user && user.username}`,
  };
}

export default connect(mapStateToProps)(DropdownSearchResultsRow);
