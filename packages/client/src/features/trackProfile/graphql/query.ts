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
      }
      duration
      genre
      streamUrl
      commentCount
    }
  }
`;
