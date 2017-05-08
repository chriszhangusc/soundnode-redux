import { connect } from 'react-redux';
import SongCardList from 'client/common/components/SongCardList';
import { getUserLikeIds, isLikesFetching } from 'client/features/user';

// FIXME: Have not written like ducks for this page yet.
// Container for SongCardList
const mapStateToProps = state => ({
  trackIds: getUserLikeIds(state), // There are invalid trackIds somehow...
  fetching: isLikesFetching(state),
});

const mapDispatchToProps = dispatch => ({
  scrollFunc() {
    console.log('Scroll Func lol');
  },
});


export default connect(mapStateToProps, mapDispatchToProps)(SongCardList);
