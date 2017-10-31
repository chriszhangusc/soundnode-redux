import React from 'react';
import { connect } from 'react-redux';
import { defaultWarning } from 'features/notification/notificationActions';

// Global error boundary for view
// TODO: Dig into the use case: https://reactjs.org/blog/2017/07/26/error-handling-in-react-16.html
class ErrorBoundary extends React.Component {
  componentDidCatch(error, info) {
    console.log('error: ', error);
    console.log('info: ', info);
    this.props.defaultWarning();
  }

  render() {
    return this.props.children;
  }
}

const actions = {
  defaultWarning,
};

export default connect(null, actions)(ErrorBoundary);
