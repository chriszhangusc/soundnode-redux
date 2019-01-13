import gql from 'graphql-tag';

export const FETCH_CHARTS = gql`
  query FetchCharts($genre: String, $offset: Int, $limit: Int) {
    charts(genre: $genre, offset: $offset, limit: $limit) {
      title
    }
  }
`;
