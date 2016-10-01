import { connect } from 'react-redux';
import NavSearch from '../components/NavSearch';
import { searchSongs } from '../../../modules/playlists/actions';

const mapDispatchToProps = dispatch => ({
  handleSearch: (searchText) => {
    dispatch(searchSongs(searchText.trim()));
  }
});

export default connect(null, mapDispatchToProps)(NavSearch);
