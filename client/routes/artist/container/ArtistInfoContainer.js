import { connect } from 'react-redux';
import { getArtistById } from 'client/redux/modules/entities';
import { t500x500 } from 'client/constants/ImageConstants';
import { formatImageUrl } from 'client/utils/FormatUtils';
import ArtistInfo from '../components/ArtistInfo';

export const mapStateToProps = (state, { artistId }) => {
  const artist = getArtistById(state, artistId);
  return {
    avatarUrl: formatImageUrl(artist.get('avatarUrl'), t500x500),
    artistName: artist.get('username'),
    followerCount: artist.get('followersCount').toLocaleString(),
    description: artist.get('description'),
  };
};

export default connect(mapStateToProps)(ArtistInfo);
