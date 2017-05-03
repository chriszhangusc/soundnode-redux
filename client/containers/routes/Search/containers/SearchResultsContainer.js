import { connect } from 'react-redux';
import SearchResults from '../components/SearchResults';

const mapStateToProps = state => ({
  // trackMap: getSearchResults(state)
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
