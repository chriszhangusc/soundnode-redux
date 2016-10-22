import { connect } from 'react-redux';
import defaultArtistImage from 'assets/images/default-artist.png';
import { getCommentById, getArtistByCommentId } from 'client/redux/modules/reducers';
import Comment from '../components/Comment';

const mapStateToProps = (state, { commentId }) => {
  const comment = getCommentById(state, commentId);
  const artist = getArtistByCommentId(state, commentId);
  return {
    defaultArtistImage,
    artistLinkUrl: `artist/${artist.getId()}`,
    artistName: artist.getUsername(),
    artistAvatarUrl: artist.getAvatarUrl(),
    commentCreatedAt: comment.getCreatedAt().replace('+0000', ''),
    commentBody: comment.getCommentBody()
  };
};

export default connect(mapStateToProps)(Comment);
