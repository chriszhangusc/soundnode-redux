import { gql } from '@apollo/client';

export const FETCH_CHARTS = gql`
  query FetchCharts($genre: String!, $offset: Int, $limit: Int) {
    charts(genre: $genre, offset: $offset, limit: $limit) {
      nodes {
        id
        title
        streamable
        artworkUrl
        permalinkUrl
        user {
          id
          username
          avatarUrl
          fullName
        }
      }
      pageInfo {
        offsetNext
        hasNext
      }
    }
  }
`;
