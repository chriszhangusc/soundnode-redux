import React from 'react';
import { notificationFailure, notificationSuccess } from 'client/features/notification';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class GlobalEvents extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;

    window.addEventListener('offline', () => {
      dispatch(notificationFailure('Looks like your internet connection is down!'));
    });

    window.addEventListener('online', () => {
      dispatch(notificationSuccess('Great, you are back online!'));
    });
  }

  componentWillUnmount() {
    // Remove global listeners
    window.removeEventListener('offline');
    window.removeEventListener('online');
  }

  render() {
    return null;
  }
}

GlobalEvents.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(GlobalEvents);
