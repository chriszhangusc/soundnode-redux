import { connect } from 'react-redux';
import { getArtistById } from 'client/redux/modules/reducers';
import { t500x500 } from 'client/constants/ImageConstants';
import { formatImageUrl } from 'client/utils/FormatUtils';
import ArtistInfo from '../components/ArtistInfo';

export const mapStateToProps = (state, { artistId }) => {
  console.log(artistId);
  const artist = getArtistById(state, artistId);
  console.log(artist);
  return {
    avatarUrl: formatImageUrl(artist.getAvatarUrl(), t500x500),
    artistName: artist.getUsername(),
    followerCount: artist.getFollowersCount(),
    description: artist.getDescription()
  };
};

export default connect(mapStateToProps)(ArtistInfo);
