import { connect } from 'react-redux';
import defaultArtistImage from 'assets/images/default-artist.png';
import { getCommentById, getArtistByCommentId } from 'client/features/entities/entitiesSelectors';
import Comment from '../components/Comment';

const mapStateToProps = (state, { commentId }) => {
  const comment = getCommentById(state, commentId);
  const artist = getArtistByCommentId(state, commentId);
  return {
    defaultArtistImage,
    artistLinkUrl: `/artist/${artist.get('id')}`,
    artistName: artist.get('username'),
    artistAvatarUrl: artist.get('avatarUrl'),
    commentCreatedAt: comment.get('createdAt').replace('+0000', ''),
    commentBody: comment.get('body'),
  };
};

export default connect(mapStateToProps)(Comment);
