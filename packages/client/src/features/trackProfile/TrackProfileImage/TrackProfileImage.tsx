import * as React from 'react';
import { formatNumberCompact } from '@soundnode-redux/client/src/common/utils/formatUtils';
import TrackImage from '@soundnode-redux/client/src/common/components/images/TrackImage';
import PlaybackOverlay from '@soundnode-redux/client/src/common/components/PlaybackOverlay';
import { getLargeVersion } from '@soundnode-redux/client/src/common/utils/imageUtils';
import OverlayInfoBar from './OverlayInfoBar';
import OverlayIconInfo from './OverlayIconInfo';

interface Props {
  artworkUrl?: string;
  playing?: boolean;
  active?: boolean;
  liked?: boolean;
  playbackCount?: number;
  likesCount?: number;
}

function TrackProfileImage({
  artworkUrl = null,
  playing = false,
  active = false,
  liked = false,
  playbackCount = 0,
  likesCount = 0,
}: Props) {
  return (
    <TrackImage src={getLargeVersion(artworkUrl)} size="large">
      <PlaybackOverlay
        playing={playing}
        active={active}
        onClick={() => {
          console.log('TODO: Play!!');
        }}
      />
      <OverlayInfoBar>
        <OverlayIconInfo name="play" info={formatNumberCompact(playbackCount)} />
        <OverlayIconInfo name="heart" active={liked} info={formatNumberCompact(likesCount)} />
      </OverlayInfoBar>
    </TrackImage>
  );
}

export default TrackProfileImage;
