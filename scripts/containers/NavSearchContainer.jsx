import { connect } from 'react-redux';
import NavSearch from '../components/NavSearch';
import actions from '../actions';

const mapDispatchToProps = (dispatch) => ({
  handleSearch: (searchText) => {
    searchText = searchText.trim();
    dispatch(actions.searchSongs(searchText));
  }
});

export default connect(null, mapDispatchToProps)(NavSearch);
