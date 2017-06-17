import { connect } from 'react-redux';
import { getTrackById } from 'client/features/entities/entitiesSelectors';
import { TRACK_PROFILE_ROUTE } from 'client/common/constants/routeConsts';
import DropdownSearchResultsRow from './DropdownSearchResultsRow';

const mapStateToProps = (state, { trackId }) => {
  const track = getTrackById(state, trackId);
  return {
    imageUrl: track.artworkUrl,
    itemLinkUrl: `${TRACK_PROFILE_ROUTE}/${trackId}`,
    itemTitle: track.title,
  };
};

export default connect(mapStateToProps)(DropdownSearchResultsRow);

