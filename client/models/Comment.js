import { Record } from 'immutable';

// The user field will be normalized to userId

const CommentRecord = Record({
  id: undefined,
  kind: '',
  userId: undefined,
  trackId: undefined,
  timestamp: 0,
  createdAt: '',
  body: '',
  uri: '',
  user: null
});

class Comment extends CommentRecord {
  getId() {
    return this.get('id');
  }

  getKind() {
    return this.get('kind');
  }

  getArtistId() {
    return this.get('userId');
  }

  getTrackId() {
    return this.get('trackId');
  }

  getTimestamp() {
    return this.get('timestamp');
  }

  getCreatedAt() {
    return this.get('createdAt');
  }

  getCommentBody() {
    return this.get('body');
  }

  getUri() {
    return this.get('uri');
  }

  // getArtistId() {
  //   return this.get('user');
  // }
}

export default Comment;
