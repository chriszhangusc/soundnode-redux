import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import * as trackProfileActions from 'features/trackProfile/trackProfileActions';
import withScrollToTopOnEnter from 'common/hocs/withScrollToTopOnEnter';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import RowLayout from 'common/components/layouts/RowLayout';
import TrackProfileComments from '../TrackProfileComments';
import TrackProfileDetails from '../TrackProfileDetails';
import TrackProfileImage from '../TrackProfileImage';

const GET_TRACK_DETAILS = gql`
  query getTrackDetails($trackId: Int!) {
    track(id: $trackId) {
      id
      title
      created_at
      user_id
      user {
        id
        username
        avatar_url
      }
      comments {
        id
        user_id
        body
        created_at
        user {
          username
          avatar_url
        }
      }
    }
  }
`;

class TrackProfile extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.object,
    }).isRequired,
    resetTrackProfileState: PropTypes.func.isRequired,
    loadTrackProfileData: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { match } = this.props;
    const trackId = match.params.trackId;
    // Switch to track playlist
    this.props.loadTrackProfileData(trackId);
  }

  // Change from different single track routes.
  componentWillReceiveProps(nextProps) {
    const curTrackId = this.props.match.params.trackId;
    const newTrackId = nextProps.match.params.trackId;

    // If curTrackId is undefined, it means this is the initial loading which is already
    // handled by CWM,
    // Check curTrackId and newTrackId to detect jumping from one track to another track.
    if (curTrackId !== newTrackId && curTrackId) {
      // Before jumping to new track profile page, clear old state.
      this.props.resetTrackProfileState();
      this.props.loadTrackProfileData(newTrackId);
    }
  }

  componentWillUnmount() {
    this.props.resetTrackProfileState();
  }

  render() {
    const { match } = this.props;
    const trackId = Number(match.params.trackId);

    return (
      <Query query={GET_TRACK_DETAILS} variables={{ trackId }}>
        {({ data, loading }) => {
          if (loading) {
            return null;
          }

          return (
            <Fragment>
              <RowLayout>
                <TrackProfileImage />
                <TrackProfileDetails />
              </RowLayout>
              <TrackProfileComments
                commentCount={data.track.comment_count}
                comments={data.track.comments}
                trackId={trackId}
              />
            </Fragment>
          );
        }}
      </Query>
    );
  }
}

export default compose(connect(null, trackProfileActions), withScrollToTopOnEnter)(TrackProfile);
