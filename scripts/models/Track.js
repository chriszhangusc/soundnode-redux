import { Record } from 'immutable';

const TrackRecord = Record({
  id: null,
  artwork_url: '',
  created_at: '',
  title: '',
  genre: '',
  description: '',
  comment_count: 0,
  playback_count: 0,
  favoritings_count: 0
  //
  // "kind": "track",
  // "user_id": 20665501,
  // "duration": 234627,
  // "commentable": true,
  // "state": "finished",
  // "original_content_size": 9382163,
  // "last_modified": "2016/10/09 21:59:57 +0000",
  // "sharing": "public",
  // "tag_list": "Youngma redlyfe ooouuu",
  // "permalink": "young-ma-ooouuu-1",
  // "streamable": true,
  // "embeddable_by": "all",
  // "downloadable": false,
  // "purchase_url": "http://smarturl.it/OOOUUU",
  // "label_id": null,
  // "purchase_title": null,
  // "genre": "Hip-hop & Rap",
  // "description": "Young M.A comes with a New single/intro called  \"OOOUUU\" \n(Club Banger!!) Produced By: U-Dubb from newyorkbangers.com\n\nPurchase official Young M.A clothing here: https://shopyoungma.com/\n\niTunes: http://smarturl.it/OOOUUU\nAmazon: http://smarturl.it/OOOUUUamazon\nGoogle Play: http://smarturl.it/OOOUUUGooglePlay\nSpotify: http://smarturl.it/OOOUUUSpotify",
  // "label_name": "M.A Music / 3D",
  // "release": "",
  // "track_type": "original",
  // "key_signature": "",
  // "isrc": "",
  // "video_url": null,
  // "bpm": null,
  // "release_year": null,
  // "release_month": null,
  // "release_day": null,
  // "original_format": "mp3",
  // "license": "all-rights-reserved",
  // "uri": "https://api.soundcloud.com/tracks/262375023",
  // "user": {
  //   "id": 20665501,
  //   "kind": "user",
  //   "permalink": "youngma",
  //   "username": "youngma",
  //   "last_modified": "2016/06/29 15:09:26 +0000",
  //   "uri": "https://api.soundcloud.com/users/20665501",
  //   "permalink_url": "http://soundcloud.com/youngma",
  //   "avatar_url": "https://i1.sndcdn.com/avatars-000185316171-zwt61b-large.jpg"
  // },
  // "permalink_url": "http://soundcloud.com/youngma/young-ma-ooouuu-1",
  // "waveform_url": "https://w1.sndcdn.com/Exbr0RDsakIP_m.png",
  // "stream_url": "https://api.soundcloud.com/tracks/262375023/stream",
  // "playback_count": 4546538,
  // "download_count": 759,
  // "favoritings_count": 520852,
  // "comment_count": 3688,
  // "attachments_uri": "https://api.soundcloud.com/tracks/262375023/attachments"
});

class Track extends TrackRecord {

  getId() {
    return this.get('id');
  }

  getArtworkUrl() {
    return this.get('artwork_url');
  }

  getCreatedAt() {
    return this.get('created_at');
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
    return this.get('comment_count');
  }

  getPlaybackCount() {
    return this.get('playback_count');
  }

  getLikedCount() {
    return this.get('favoritings_count');
  }
}

export default Track;
