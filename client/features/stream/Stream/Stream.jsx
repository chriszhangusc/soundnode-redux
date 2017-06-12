import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import { loadStreamData } from '../streamActions';
import StreamList from './StreamList';
import { getStreamIds } from '../streamSelectors';

const Title = styled.h1`
  margin: 30px 20px;
  font-weight: 400;
  font-size: 2rem;
`;

class Stream extends React.Component {
  componentWillMount() {
    const { onPageLoad } = this.props;
    onPageLoad();
  }

  componentWillUnmount() {}

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
  onPageLoad: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    streamIds: getStreamIds(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onPageLoad: bindActionCreators(loadStreamData, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Stream);
