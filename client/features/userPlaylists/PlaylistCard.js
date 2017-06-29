import { connect } from 'react-redux';
import { getPlaylistById } from 'features/entities/entitiesSelectors';
import MaterialCard from 'common/components/MaterialCard';

function mapStateToProps(state, { playlistId }) {
  return {
    playlist: getPlaylistById(state, playlistId),
  };
}

export default connect(mapStateToProps)(MaterialCard);
