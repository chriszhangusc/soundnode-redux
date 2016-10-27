import { connect } from 'react-redux';
import SongCardList from 'client/components/SongCardList';
import { getUserLikeIds } from 'client/redux/modules/user';

// FIXME: Have not written like ducks for this page yet.
// Container for SongCardList
const mapStateToProps = state => ({
  trackIds: getUserLikeIds(state), // There are invalid trackIds somehow...
  fetching: true,
});

const mapDispatchToProps = dispatch => ({
  scrollFunc() {
    console.log('Scroll Func lol');
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(SongCardList);
