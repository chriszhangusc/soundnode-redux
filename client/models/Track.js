import { Record } from 'immutable';
// import Artist from './Artist';

const TrackRecord = Record({
  id: undefined, // id should be undefined to identify it is not initialized!!
  artworkUrl: '',
  createdAt: '',
  title: '',
  genre: '',
  description: '',
  duration: 0,
  commentCount: 0,
  playbackCount: 0,
  favoritingsCount: 0,
  userId: undefined,
  permalinkUrl: '',
  streamUrl: ''
});

class Track extends TrackRecord {

  getId() {
    return this.get('id').toString();
  }
  // User field will be set to user id after normalization
  getArtistId() {
    return this.get('userId').toString();
  }

  getArtworkUrl() {
    return this.get('artworkUrl');
  }

  getCreatedAt() {
    return this.get('createdAt');
  }

  getTitle() {
    return this.get('title');
  }

  getGenre() {
    return this.get('genre');
  }

  getDescription() {
    return this.get('description');
  }

  getCommentCount() {
    return this.get('commentCount');
  }

  getPlaybackCount() {
    return this.get('playbackCount');
  }

  getLikedCount() {
    return this.get('favoritingsCount');
  }

  getPermalinkUrl() {
    return this.get('permalinkUrl');
  }

  getStreamUrl() {
    return this.get('streamUrl');
  }

  getDuration() {
    return Math.floor(this.get('duration') / 1000.0);
  }
}


export default Track;
