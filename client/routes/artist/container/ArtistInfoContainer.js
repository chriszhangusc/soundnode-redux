import { connect } from 'react-redux';
import { getArtistById } from 'client/redux/modules/entities';
import { t500x500 } from 'client/constants/ImageConstants';
import { formatImageUrl } from 'client/utils/FormatUtils';
import ArtistInfo from '../components/ArtistInfo';

export const mapStateToProps = (state, { artistId }) => {
  const artist = getArtistById(state, artistId);
  console.log(artist.avatarUrl);
  return {
    avatarUrl: formatImageUrl(artist.avatarUrl, t500x500),
    artistName: artist.username,
    followerCount: artist.followersCount.toLocaleString(),
    description: artist.description,
  };
};

export default connect(mapStateToProps)(ArtistInfo);
