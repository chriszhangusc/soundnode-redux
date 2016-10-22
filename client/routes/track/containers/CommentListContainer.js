import { connect } from 'react-redux';
import { getTrackCommentIds } from 'client/redux/modules/reducers';
import CommentList from '../components/CommentList';

const mapStateToProps = (state, { track }) => ({
  commentCount: track.getCommentCount(),
  commentIds: getTrackCommentIds(state)
});

export default connect(mapStateToProps)(CommentList);
