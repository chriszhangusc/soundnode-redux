import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import InfiniteScroll from '@soundnode-redux/client/src/common/components/InfiniteScroll';
import styled from 'styled-components';
import Spinner from '@soundnode-redux/client/src/common/components/spinners/RectsScale';
import TrackProfileComment from '../TrackProfileComment';

const GET_TRACK_COMMENTS = gql`
  query getTrackComments($trackId: Int!, $limit: Int!, $offset: Int!) {
    comments(trackId: $trackId, limit: $limit, offset: $offset) {
      id
      body
      created_at
      user {
        avatar_url
        username
      }
    }
  }
`;

const SpinnerWrapper = styled.div`
  padding: 20px 0;
  margin: 0px auto;
  width: 100%;
`;

function handleFetch(fetchMore, data) {
  return () => {
    fetchMore({
      variables: {
        offset: data.comments.length,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;

        return Object.assign({}, prev, {
          comments: [...prev.comments, ...fetchMoreResult.comments],
        });
      },
    });
  };
}

function TrackProfileCommentList({ trackId }) {
  return (
    <Query
      query={GET_TRACK_COMMENTS}
      variables={{ trackId, limit: 20, offset: 0 }}
      notifyOnNetworkStatusChange
    >
      {({ data, loading, fetchMore }) => {
        if (_.isEmpty(data)) {
          return null;
        }
        return (
          <InfiniteScroll onBottomReached={handleFetch(fetchMore, data)}>
            <ul>
              {data.comments.map(comment => (
                <li key={comment.id}>
                  <TrackProfileComment comment={comment} />
                </li>
              ))}
            </ul>

            {loading && (
              <SpinnerWrapper>
                <Spinner />
              </SpinnerWrapper>
            )}
          </InfiniteScroll>
        );
      }}
    </Query>
  );
}

TrackProfileCommentList.propTypes = {
  trackId: PropTypes.number.isRequired,
};

export default TrackProfileCommentList;
