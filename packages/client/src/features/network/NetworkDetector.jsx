import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as notificationActions from '@soundnode-redux/client/src/features/notification/notificationActions';

class NetworkDetector extends React.Component {
  componentDidMount() {
    window.addEventListener('offline', () => {
      this.props.notificationWarning('Looks like your internet connection is down!');
    });

    window.addEventListener('online', () => {
      this.props.notificationSuccess('Great, you are back online!');
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

NetworkDetector.propTypes = {
  notificationWarning: PropTypes.func.isRequired,
  notificationSuccess: PropTypes.func.isRequired,
};

export default connect(null, notificationActions)(NetworkDetector);
