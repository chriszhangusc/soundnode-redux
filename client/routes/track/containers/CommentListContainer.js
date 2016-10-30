import { connect } from 'react-redux';
import { getTrackCommentIds, isTrackCommentsFetching, loadMoreComments } from 'client/redux/modules/track';
import CommentList from '../components/CommentList';

function mapStateToProps(state, { track }) {
  return ({
    commentCount: track.get('commentCount'),
    commentIds: getTrackCommentIds(state),
    commentsFetching: isTrackCommentsFetching(state),
  });
}

function mapDispatchToProps(dispatch) {
  return {
    scrollFunc() {
      console.log('Load more comments');
      dispatch(loadMoreComments());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentList);
