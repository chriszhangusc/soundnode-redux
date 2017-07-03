import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as notificationActions from 'features/notification/notificationActions';

class GlobalEvents extends React.Component {
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

GlobalEvents.propTypes = {
  notificationWarning: PropTypes.func.isRequired,
  notificationSuccess: PropTypes.func.isRequired,
};

export default connect(null, notificationActions)(GlobalEvents);
