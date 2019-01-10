import React from 'react';
import { getDisplayName } from '@soundnode-redux/client/src/common/utils/hocUtils';

export default function withScrollDisabled(WrappedComponent) {
  class EnhancedComponent extends React.Component {
    componentWillMount() {
      document.body.style.overflow = 'hidden';
    }

    componentWillUnmount() {
      document.body.style.overflow = 'scroll';
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  EnhancedComponent.displayName = `WithScrollDisabled(${getDisplayName(WrappedComponent)})`;

  return EnhancedComponent;
}
