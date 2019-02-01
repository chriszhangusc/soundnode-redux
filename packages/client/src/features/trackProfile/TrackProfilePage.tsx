import * as React from 'react';
import { get } from 'lodash';
import { RouteComponentProps } from 'react-router';
import { Query } from 'react-apollo';
import RowLayout from '@soundnode-redux/client/src/common/components/layouts/RowLayout';
import { mergeObjects } from '@soundnode-redux/client/src/common/utils/generalUtils';
import TrackProfileComments from './TrackProfileComments';
import TrackProfileDetails from './TrackProfileDetails';
import TrackProfileImage from './TrackProfileImage';
import { GET_TRACK, GET_COMMENTS } from './graphql/query';
import InfiniteScroll from '../../common/components/InfiniteScroll';

type MatchParam = {
  trackId: string;
};

export type Props = RouteComponentProps<MatchParam>;

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
            <Query
              query={GET_COMMENTS}
              variables={{
                trackId: track.id,
                offset: 0,
                limit: 10,
              }}
            >
              {({ data, loading, fetchMore }) => {
                const comments = get(data, 'trackComments.nodes') || [];

                return (
                  <InfiniteScroll
                    onBottomReached={() => {
                      const hasNext = get(data, 'trackComments.pageInfo.hasNext');
                      const offsetNext = get(data, 'trackComments.pageInfo.offsetNext');

                      if (!loading && hasNext) {
                        fetchMore({
                          variables: { offset: offsetNext },
                          updateQuery: (prev, { fetchMoreResult }) => {
                            if (!fetchMoreResult) return prev;

                            return Object.assign({}, prev, {
                              trackComments: {
                                ...fetchMoreResult.trackComments,
                                // NOTE: The results returned by soundcloud api
                                // sometimes contains duplicates
                                nodes: mergeObjects(
                                  prev.trackComments.nodes,
                                  fetchMoreResult.trackComments.nodes,
                                  (obj: any) => obj.id,
                                ),
                              },
                            });
                          },
                        });
                      }
                    }}
                  >
                    <TrackProfileComments commentCount={track.commentCount} comments={comments} />
                  </InfiniteScroll>
                );
              }}
            </Query>
          </React.Fragment>
        );
      }}
    </Query>
  );
}

export default TrackProfilePage;
