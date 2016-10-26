import React, { Component, PropTypes } from 'react';
// Higher order component
export default function (InnerComponent) {
  class InfiniteScrollComponent extends Component {
    constructor(props) {
      super(props);
      this.onScroll = this.onScroll.bind(this);
    }

    componentDidMount() {
      window.addEventListener('scroll', this.onScroll, false);
    }

    componentWillUnmount() {
      window.removeEventListener('scroll', this.onScroll, false);
    }

    onScroll() {
      if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight)) {
        const { scrollFunc } = this.props;
        scrollFunc();
      }
    }

    render() {
      return <InnerComponent {...this.props} />;
    }
  }

  InfiniteScrollComponent.propTypes = {
    scrollFunc: PropTypes.func.isRequired
    // dispatch: PropTypes.func.isRequired
  };
  // Connect to redux store only because we need dispatch!
  return InfiniteScrollComponent;
}
