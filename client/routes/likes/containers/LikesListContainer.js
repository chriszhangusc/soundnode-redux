import { connect } from 'react-redux';
import SongCardList from 'client/components/SongCardList';
import {
  getUserLikeIds
} from 'client/redux/modules/reducers';

// Container for SongCardList
const mapStateToProps = state => ({
  trackIds: getUserLikeIds(state) // There are invalid trackIds somehow...
});

const mapDispatchToProps = dispatch => ({
  scrollFunc() {
    console.log('Scroll Func lol');
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(SongCardList);
