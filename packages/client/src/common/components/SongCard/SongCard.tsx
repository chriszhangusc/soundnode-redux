import * as React from 'react';
import * as PropTypes from 'prop-types';
import Card from '@soundnode-redux/client/src/common/components/Card';
import SongCardDetails from './SongCardDetails';
import SongCardActions from './SongCardActions';
import SongCardImage from './SongCardImage';
import { getLargeVersion } from '../../utils/imageUtils';

function SongCard({ track }) {
  if (track && track.streamable) {
    const { artworkUrl } = track;

    return (
      <Card>
        <SongCardImage src={getLargeVersion(artworkUrl)} />
        <SongCardDetails track={track} />
        <SongCardActions track={track} />
      </Card>
    );
  }

  return null;
}

SongCard.propTypes = {
  track: PropTypes.shape({
    streamable: PropTypes.bool,
    artworkUrl: PropTypes.string,
  }).isRequired,
};

export default SongCard;
