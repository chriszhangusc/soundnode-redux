import * as React from 'react';
import { get } from 'lodash';
import { RouteComponentProps } from 'react-router';
import { Query } from 'react-apollo';
import RowLayout from '@soundnode-redux/client/src/common/components/layouts/RowLayout';
import TrackProfileComments from './TrackProfileComments';
import TrackProfileDetails from './TrackProfileDetails';
import TrackProfileImage from './TrackProfileImage';
import { GET_TRACK } from './graphql/query';

interface MatchParam {
  trackId: string;
}

export interface Props extends RouteComponentProps<MatchParam> {}

function formatUserRoute(userId) {
  return `/users/${userId}`;
}

function TrackProfilePage({ match }: Props) {
  const trackId = Number(match.params.trackId);

  return (
    <Query query={GET_TRACK} variables={{ id: trackId }}>
      {({ data, loading }) => {
        if (loading) {
          return null;
        }
        const track = get(data, 'track');
        console.log(track);
        const artworkUrl = get(track, 'artworkUrl');
        // TODO: playing: get from global state
        // TODO: active: get from global state
        // liked = false,
        const playbackCount: number = get(track, 'playbackCount') || 0;
        const likesCount: number = get(track, 'likesCount') || 0;
        const title = get(track, 'title');
        const username = get(track, 'user.username');
        const description = get(track, 'desctiption');
        const userRoute = formatUserRoute(get(track, 'user.id'));

        return (
          <React.Fragment>
            <RowLayout>
              <TrackProfileImage
                artworkUrl={artworkUrl}
                liked={true}
                playbackCount={playbackCount}
                likesCount={likesCount}
              />
              <TrackProfileDetails
                title={title}
                username={username}
                description={description}
                userRoute={userRoute}
              />
            </RowLayout>
            {/* <TrackProfileComments
              commentCount={data.track.comment_count}
              comments={data.track.comments}
              trackId={trackId}
            /> */}
          </React.Fragment>
        );
      }}
    </Query>
  );
}

export default TrackProfilePage;
