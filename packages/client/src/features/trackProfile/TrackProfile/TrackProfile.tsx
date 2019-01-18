import * as React from 'react';
import { get } from 'lodash';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { RouteComponentProps } from 'react-router';
import * as trackProfileActions from '@soundnode-redux/client/src/features/trackProfile/trackProfileActions';
import withScrollToTopOnEnter from '@soundnode-redux/client/src/common/hocs/withScrollToTopOnEnter';
import { Query } from 'react-apollo';
import RowLayout from '@soundnode-redux/client/src/common/components/layouts/RowLayout';
import TrackProfileComments from '../TrackProfileComments';
import TrackProfileDetails from '../TrackProfileDetails';
import TrackProfileImage from '../TrackProfileImage';
import { GET_TRACK } from '../graphql/query';

interface MatchParam {
  trackId: string;
}

export interface Props extends RouteComponentProps<MatchParam> {}

function TrackProfile({ match }: Props) {
  const trackId = Number(match.params.trackId);

  return (
    <Query query={GET_TRACK} variables={{ id: trackId }}>
      {({ data, loading }) => {
        if (loading) {
          return null;
        }

        console.log({ data });
        const artworkUrl = get(data, 'track.artworkUrl');
        // TODO: playing: get from global state
        // TODO: active: get from global state
        // liked = false,
        const playbackCount = get(data, 'track.playbackCount');
        const likesCount = get(data, 'track.likesCount');

        // return null;
        return (
          <React.Fragment>
            <RowLayout>
              <TrackProfileImage
                artworkUrl={artworkUrl}
                liked={true}
                playbackCount={playbackCount}
                likesCount={likesCount}
              />
              {/* <TrackProfileDetails /> */}
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

export default compose(
  connect(
    null,
    trackProfileActions,
  ),
  withScrollToTopOnEnter,
)(TrackProfile);
