import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { isAuthenticated } from 'features/auth/authUtils';
import { notificationWarning } from 'features/notification/notificationActions';
import { getDisplayName } from 'common/utils/hocUtils';

export default function withAuthReqired(WrappedComponent) {
  class EnhancedComponent extends Component {
    componentWillMount() {
      if (!isAuthenticated()) {
        this.props.notificationWarning('Please signin with SoundCloud first');
      }
    }
    render() {
      const authed = isAuthenticated();
      return authed ? <WrappedComponent {...this.props} /> : <Redirect to="/" />;
    }
  }

  EnhancedComponent.propTypes = {
    notificationWarning: PropTypes.func.isRequired,
  };

  EnhancedComponent.displayName = `withAuthReqired(${getDisplayName(WrappedComponent)})`;

  return connect(null, { notificationWarning })(EnhancedComponent);
}
