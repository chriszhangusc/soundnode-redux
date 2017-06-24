import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  notificationSuccess,
  notificationWarning,
} from 'features/notification/notificationActions';

class GlobalEvents extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;

    window.addEventListener('offline', () => {
      dispatch(notificationWarning('Looks like your internet connection is down!'));
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
