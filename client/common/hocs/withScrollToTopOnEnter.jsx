import React from 'react';
import { getDisplayName } from 'common/utils/hocUtils';

export default function withScrollToTopOnEnter(WrappedComponent) {
  class EnhancedComponent extends React.Component {
    componentDidMount() {
      window.scrollTo(0, 0);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  EnhancedComponent.displayName = `withScrollToTopOnEnter(${getDisplayName(WrappedComponent)})`;

  return EnhancedComponent;
}
