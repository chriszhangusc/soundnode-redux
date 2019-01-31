import gql from 'graphql-tag';

export const GET_TRACK = gql`
  query GetTrack($id: ID!) {
    track(id: $id) {
      streamUrl
      streamable
      id
      title
      description
      artworkUrl
      permalinkUrl
      playbackCount
      likesCount
      user {
        id
        username
      }
      duration
      genre
      streamUrl
      commentCount
    }
  }
`;

export const GET_COMMENTS = gql`
  query FetchCommentsByTrackId($trackId: Int!, $offset: Int, $limit: Int) {
    trackComments(trackId: $trackId, offset: $offset, limit: $limit) {
      nodes {
        id
        createdAt
        body
        userId
        trackId
        user {
          id
          fullName
          avatarUrl
          username
        }
      }
      pageInfo {
        hasNext
        offsetNext
      }
    }
  }
`;
