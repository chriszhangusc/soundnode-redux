import React from 'react';
import { get } from 'lodash';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import { RouteComponentProps } from 'react-router';
import InfiniteScroll from '@soundnode-redux/client/src/common/components/InfiniteScroll';
import SongCard from '@soundnode-redux/client/src/common/components/SongCard';
import Spinner from '@soundnode-redux/client/src/common/components/spinners/RectsScale';
import PageTitle from '@soundnode-redux/client/src/common/components/PageTitle';
import { mergeObjects } from '@soundnode-redux/client/src/common/utils/generalUtils';

import ChartsGenreList from './ChartsGenreList';
import { FETCH_CHARTS } from './graphql/query';
import { getGenreTitle } from './utils';

const LIMIT = 20;

const ChartsListWrapper = styled.div`
  display: flex;
  margin-bottom: 30px;
  flex-wrap: wrap;
`;

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

interface MatchParam {
  genre: string;
}

export interface Props extends RouteComponentProps<MatchParam> {}

function ChartsPage(props: Props) {
  const {
    match: {
      params: { genre },
    },
  } = props;

  const variables = {
    genre,
    offset: 0,
    limit: LIMIT,
  };

  return (
    <Query query={FETCH_CHARTS} variables={variables} notifyOnNetworkStatusChange>
      {({ loading, data, fetchMore }) => (
        <React.Fragment>
          <PageTitle>Top Charts - {getGenreTitle(genre)}</PageTitle>
          <ChartsGenreList />
          <InfiniteScroll
            onBottomReached={() => {
              const hasNext = get(data, 'charts.pageInfo.hasNext');

              if (!loading && hasNext) {
                fetchMore({
                  variables: { offset: data.charts.pageInfo.offsetNext },
                  updateQuery: (prev, { fetchMoreResult }) => {
                    if (!fetchMoreResult) return prev;

                    return Object.assign({}, prev, {
                      charts: {
                        ...fetchMoreResult.charts,
                        // NOTE: The results returned by soundcloud api
                        // sometimes contains duplicates
                        nodes: mergeObjects(
                          prev.charts.nodes,
                          fetchMoreResult.charts.nodes,
                          (obj: any) => obj.id,
                        ),
                      },
                    });
                  },
                });
              }
            }}
          >
            <ChartsListWrapper>
              {get(data, 'charts.nodes', []).map(track => (
                <SongCard track={track} key={String(track.id)} />
              ))}
            </ChartsListWrapper>
            {loading && (
              <SpinnerWrapper>
                <Spinner />
              </SpinnerWrapper>
            )}
          </InfiniteScroll>
        </React.Fragment>
      )}
    </Query>
  );
}

export default ChartsPage;
