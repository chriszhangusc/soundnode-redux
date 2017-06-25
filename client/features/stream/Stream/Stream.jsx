import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { updateVisiblePlaylistName } from 'features/playlist/playlistActions';
import * as streamActions from '../streamActions';
import StreamList from './StreamList';

const Title = styled.h1`
  margin: 30px 20px;
  font-weight: 400;
  font-size: 2rem;
`;

class Stream extends React.Component {
  componentWillMount() {
    this.props.updateVisiblePlaylistName('stream');
    this.props.loadStream();
  }

  componentWillUnmount() {
    this.props.resetStreamState();
  }

  render() {
    return (
      <div>
        <Title>Stream</Title>
        <StreamList />
      </div>
    );
  }
}

Stream.propTypes = {
  loadStream: PropTypes.func.isRequired,
  resetStreamState: PropTypes.func.isRequired,
  updateVisiblePlaylistName: PropTypes.func.isRequired,
};

const actions = {
  ...streamActions,
  updateVisiblePlaylistName,
};

export default connect(null, actions)(Stream);
