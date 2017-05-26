import React, { Component } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';

export default function (InnerComponent) {
  class InfiniteScrollComponent extends Component {
    constructor(props) {
      super(props);
      this.onScroll = this.onScroll.bind(this);
      this.onScroll = debounce(this.onScroll, 300);
    }

    componentDidMount() {
      window.addEventListener('scroll', this.onScroll, false);
    }

    componentWillUnmount() {
      window.removeEventListener('scroll', this.onScroll, false);
    }

    onScroll() {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        const { scrollFunc } = this.props;
        scrollFunc();
      }
    }
    render() {
      return <InnerComponent {...this.props} />;
    }
  }

  InfiniteScrollComponent.propTypes = {
    scrollFunc: PropTypes.func.isRequired,
  };
  // Connect to redux store only because we need dispatch!
  return InfiniteScrollComponent;
}
