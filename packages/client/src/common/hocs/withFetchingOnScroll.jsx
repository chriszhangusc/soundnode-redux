import React, { Component } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import { getDisplayName } from '@soundnode-redux/client/src/common/utils/hocUtils';

export default function withFetchingOnScroll(WrappedComponent) {
  class EnhancedComponent extends Component {
    constructor(props) {
      super(props);
      this.onScroll = debounce(this.onScroll, 300);
    }

    componentDidMount() {
      window.addEventListener('scroll', this.onScroll, false);
    }

    componentWillUnmount() {
      window.removeEventListener('scroll', this.onScroll, false);
    }

    onScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        if (this.props.scrollFunc) {
          this.props.scrollFunc();
        }
      }
    };

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  EnhancedComponent.displayName = `WithFetchingOnScroll(${getDisplayName(WrappedComponent)})`;

  EnhancedComponent.propTypes = {
    scrollFunc: PropTypes.func.isRequired,
  };

  return EnhancedComponent;
}
