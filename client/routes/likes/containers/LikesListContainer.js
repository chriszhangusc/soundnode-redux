import { connect } from 'react-redux';
import SongCardList from 'client/components/SongCardList';
import {
  isUIFetching,
  getUserLikeIds
} from 'client/redux/modules/reducers';

// Container for SongCardList
const mapStateToProps = state => ({
  trackIds: getUserLikeIds(state), // There are invalid trackIds somehow...
  fetching: isUIFetching(state)
});

const mapDispatchToProps = dispatch => ({
  scrollFunc() {
    console.log('Scroll Func lol');
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(SongCardList);
