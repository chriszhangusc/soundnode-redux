import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import InfiniteScroll from '@soundnode-redux/client/src/common/components/InfiniteScroll';
import styled from 'styled-components';
import Spinner from '@soundnode-redux/client/src/common/components/spinners/RectsScale';
import useInfiniteScroll from '@soundnode-redux/client/src/common/hooks/useInfiniteScroll';
import TrackProfileComment from '../TrackProfileComment';

const SpinnerWrapper = styled.div`
  padding: 20px 0;
  margin: 0px auto;
  width: 100%;
`;

function TrackProfileCommentList({ comments = [] }) {
  return (
    <ul>
      {comments.map(comment => (
        <li key={comment.id}>
          <TrackProfileComment comment={comment} />
        </li>
      ))}
    </ul>
  );
}

export default TrackProfileCommentList;
