import { Record } from 'immutable';
import { camelizeKeys } from 'humps';

const ArtistRecord = Record({
  id: null,
  kind: '',
  permalink: '',
  username: '',
  last_modified: '',
  uri: '',
  permalink_url: '',
  avatar_url: '',
  country: '',
  first_name: '',
  last_name: '',
  full_name: '',
  description: '',
  city: '',
  track_count: 0,
  playlist_count: 0,
  followers_count: 0,
  followings_count: 0
});

class Artist extends ArtistRecord {
  getId() {
    return this.get('id');
  }

  getKind() {
    return this.get('kind');
  }

  getUsername() {
    return this.get('username');
  }

  getAvatarUrl() {
    return this.get('avatar_url');
  }

  getDescription() {
    return this.get('description');
  }

  getFollowersCount() {
    return this.get('followers_count');
  }
}

export default Artist;
