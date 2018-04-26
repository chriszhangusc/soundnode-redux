import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import * as trackProfileActions from 'features/trackProfile/trackProfileActions';
import { isPageLoading } from 'features/trackProfile/trackProfileSelectors';
import withScrollToTopOnEnter from 'common/hocs/withScrollToTopOnEnter';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import TrackProfileComments from '../TrackProfileComments';
import TrackProfileHeader from '../TrackProfileHeader';

const QUERY = gql`
  query {
    track(id: 338900157) {
      id
      title
      created_at
      user_id
      user {
        id
        username
        avatar_url
      }
    }
  }
`;

class TrackProfile extends React.Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.object,
    }).isRequired,
    resetTrackProfileState: PropTypes.func.isRequired,
    loadTrackProfileData: PropTypes.func.isRequired,
    pageLoading: PropTypes.bool.isRequired,
  };

  componentDidMount() {
    const { match } = this.props;
    const trackId = match.params.trackId;
    window.scrollTo(0, 0);
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
    const { pageLoading } = this.props;
    if (pageLoading) {
      // If comments or profiled track is fetching, show spinner
      return null;
    }
    return (
      <Query query={QUERY}>
        {(data, loading) => {
          if (loading) {
            return null;
          }
          console.log(data.track);

          return (
            <div>
              <TrackProfileHeader />
              <TrackProfileComments />
            </div>
          );
        }}
      </Query>
    );
  }
}

function mapStateToProps(state) {
  return {
    pageLoading: isPageLoading(state),
  };
}

export default compose(connect(mapStateToProps, trackProfileActions), withScrollToTopOnEnter)(
  TrackProfile,
);
