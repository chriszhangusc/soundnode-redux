import { Record } from 'immutable';
import Artist from './Artist';

const CommentRecord = Record({
    id: null,
    kind: '',
    user_id: null,
    track_id: null,
    timestamp: 0,
    created_at: '',
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

    getUserId() {
        return this.get('user_id');
    }

    getTrackId() {
        return this.get('track_id');
    }

    getTimestamp() {
        return this.get('timestamp');
    }

    getCreatedAt() {
        return this.get('createdAt');
    }

    getBody() {
        return this.get('body');
    }

    getUri() {
        return this.get('uri');
    }

    getArtist() {
        return new Artist(this.get('user'));
    }
}

export default Comment;
