import { connect } from 'react-redux';
import { getTrackCommentIds } from 'client/redux/modules/track';
import CommentList from '../components/CommentList';

const mapStateToProps = (state, { track }) => ({
  commentCount: track.get('commentCount'),
  commentIds: getTrackCommentIds(state)
});

export default connect(mapStateToProps)(CommentList);
