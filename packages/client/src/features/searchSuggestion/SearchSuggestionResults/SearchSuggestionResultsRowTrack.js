import { connect } from 'react-redux';
import { getTrackById, getUserByTrackId } from '@soundnode-redux/client/src/features/entities/entitiesSelectors';
import { TRACK_PROFILE_ROUTE } from '@soundnode-redux/client/src/common/constants/routeConsts';
import SearchSuggestionResultsRow from './SearchSuggestionResultsRow';

function mapStateToProps(state, { trackId }) {
  const { artworkUrl, title } = getTrackById(state, trackId);
  const { username } = getUserByTrackId(state, trackId);
  return {
    type: 'track',
    avatarUrl: artworkUrl,
    linkUrl: `${TRACK_PROFILE_ROUTE}/${trackId}`,
    title,
    subtitle: `Track by ${username}`,
  };
}

export default connect(mapStateToProps)(SearchSuggestionResultsRow);
