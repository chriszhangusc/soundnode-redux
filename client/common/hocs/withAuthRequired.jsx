import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { isAuthenticated } from 'features/auth/authUtils';
import { authRequired } from 'features/notification/notificationActions';
import { getDisplayName } from 'common/utils/hocUtils';

export default function withAuthRequired(WrappedComponent) {
  class EnhancedComponent extends Component {
    componentDidMount() {
      if (!isAuthenticated()) {
        this.props.authRequired();
      }
    }

    render() {
      const authed = isAuthenticated();
      return authed ? <WrappedComponent {...this.props} /> : <Redirect to="/" />;
    }
  }

  EnhancedComponent.propTypes = {
    authRequired: PropTypes.func.isRequired,
  };

  EnhancedComponent.displayName = `withAuthReqired(${getDisplayName(WrappedComponent)})`;

  const actions = {
    authRequired,
  };

  return connect(null, actions)(EnhancedComponent);
}
