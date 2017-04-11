import { connect } from 'react-redux';
import { getArtistById } from 'client/redux/modules/entities';
import { t500x500, mini } from 'client/constants/ImageConstants';
import { formatImageUrl } from 'client/utils/FormatUtils';
import ArtistInfo from '../components/ArtistInfo';

export const mapStateToProps = (state, { artistId }) => {
  const artist = getArtistById(state, artistId);
  const avatarUrl = artist.avatarUrl;
  return {
    avatarUrl: formatImageUrl(avatarUrl, t500x500),
    avatarUrlSmall: formatImageUrl(avatarUrl, mini),
    artistName: artist.username,
    followerCount: artist.followersCount.toLocaleString(),
    description: artist.description,
  };
};

export default connect(mapStateToProps)(ArtistInfo);
