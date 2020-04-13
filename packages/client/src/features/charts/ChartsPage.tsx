import React from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';
import { RouteComponentProps } from 'react-router';
import InfiniteScroll from '@soundnode-redux/client/src/common/components/InfiniteScroll';
import SongCard from '@soundnode-redux/client/src/common/components/SongCard';
import Spinner from '@soundnode-redux/client/src/common/components/spinners/RectsScale';
import PageTitle from '@soundnode-redux/client/src/common/components/PageTitle';
import { mergeObjects } from '@soundnode-redux/client/src/common/utils/generalUtils';
import {
  isPlayerPlaying,
  isPlayerLoading,
  getActiveTrackId,
} from '@soundnode-redux/client/src/features/player/playerSelectors';
import { togglePlaybackState } from '@soundnode-redux/client/src/features/player/playerActions';

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

export type Props = RouteComponentProps<MatchParam> & {
  playing: boolean;
  dispatch: any;
  activeTrackId: number;
};

function ChartsPage(props: Props) {
  const {
    match: {
      params: { genre },
    },
    playing,
    activeTrackId,
    dispatch,
  } = props;

  const variables = {
    genre,
    offset: 0,
    limit: LIMIT,
  };

  const { data, loading, fetchMore } = useQuery(FETCH_CHARTS, {
    variables,
    notifyOnNetworkStatusChange: true,
  });

  return (
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
      <React.Fragment>
        <PageTitle>Top Charts - {getGenreTitle(genre)}</PageTitle>
        <ChartsGenreList />
        <ChartsListWrapper>
          {get(data, 'charts.nodes', []).map((track) => {
            const active = track.id === activeTrackId;

            return (
              <SongCard
                track={track}
                key={String(track.id)}
                active={active}
                loading={active && loading}
                playing={active && playing}
                onToggle={() => {
                  if (!active && !playing) {
                    dispatch(togglePlaybackState(track.id));
                  }
                }}
              />
            );
          })}
        </ChartsListWrapper>
        {loading && (
          <SpinnerWrapper>
            <Spinner />
          </SpinnerWrapper>
        )}
      </React.Fragment>
    </InfiniteScroll>
  );
}

const mapState = (state) => ({
  playing: isPlayerPlaying(state),
  activeTrackId: getActiveTrackId(state),
  loading: isPlayerLoading(state),
});

export default connect(mapState)(ChartsPage);
