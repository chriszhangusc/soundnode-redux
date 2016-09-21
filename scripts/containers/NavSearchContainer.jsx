import { connect } from 'react-redux';
import NavSearch from '../components/NavSearch';
import actions from '../actions';

const mapDispatchToProps = dispatch => ({
  handleSearch: (searchText) => {
    dispatch(actions.searchSongs(searchText.trim()));
  }
});

export default connect(null, mapDispatchToProps)(NavSearch);
