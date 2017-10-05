import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TrackListRow from './TrackListRow';

const TrackListHeaderWrapper = styled.div`
  padding-bottom: 10px;
  display: flex;
  flex-direction: row;
`;

const TableCell = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  width: ${props => props.width};
`;

const TableHeader = TableCell.extend`font-weight: 600;`;

const Id = styled.div`
  display: flex;
  color: ${props => props.theme.colors.fontColorSub};
  align-items: center;
  justify-content: center;
  width: 30px;
`;

const IdHeader = Id.extend`color: ${props => props.theme.colors.fontColor};`;

const ShowMoreLessButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  padding: 10px 0;
  cursor: pointer;
  border-top: 1px solid ${props => props.theme.colors.separatorDark};
  &:hover {
    background: ${props => props.theme.colors.separatorDark};
  }
`;

const TrackListContentWrapper = styled.div`
  max-height: ${props => (props.folded ? 147 : props.itemCount * 49)}px;
  transition: max-height 1000ms ease-in-out;
  overflow: hidden;
`;

const TrackListWrapper = styled.div`
  background-color: ${props => props.theme.colors.bg};
  box-shadow: 0 0 12px 8px ${props => props.theme.colors.boxShadowColor};
  border: 1px solid ${props => (props.active ? props.theme.colors.themeColor : 'transparent')};
  padding: 16px 16px 0 16px;
`;

class TrackList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      folded: true,
    };
  }

  handleShowMoreLessClick = () => {
    this.setState({
      folded: !this.state.folded,
    });
  };

  render() {
    const { tracks } = this.props;
    return (
      <TrackListWrapper>
        <TrackListHeaderWrapper>
          <IdHeader>#</IdHeader>
          <TableHeader width="40%">Title</TableHeader>
          <TableHeader width="30%">Artist</TableHeader>
          <TableHeader width="15%">Time</TableHeader>
          <TableHeader width="10%">Played</TableHeader>
        </TrackListHeaderWrapper>

        <TrackListContentWrapper folded={this.state.folded} itemCount={tracks.length}>
          {tracks.map((track, idx) => <TrackListRow key={idx} track={track} id={idx + 1} />)}
        </TrackListContentWrapper>

        {tracks.length >= 4 && (
          <ShowMoreLessButton onClick={this.handleShowMoreLessClick}>
            {this.state.folded ? 'Show More' : 'Show Less'}
          </ShowMoreLessButton>
        )}
      </TrackListWrapper>
    );
  }
}

TrackList.propTypes = {
  tracks: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TrackList;
