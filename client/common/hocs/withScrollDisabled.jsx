import React from 'react';
import { getDisplayName } from 'common/utils/hocUtils';

export default function withScrollDisabled(WrappedComponent) {
  class EnhancedComponent extends React.Component {
    componentWillMount() {
      document.body.style.overflow = 'hidden';
    }

    componentWillUnmount() {
      document.body.style.overflow = 'scroll';
    }

    render() {
      // Sometimes props will be empty...
      // console.log(this.props);
      return <WrappedComponent {...this.props} />;
    }
  }

  EnhancedComponent.displayName = `WithScrollDisabled(${getDisplayName(WrappedComponent)})`;

  return EnhancedComponent;
}
