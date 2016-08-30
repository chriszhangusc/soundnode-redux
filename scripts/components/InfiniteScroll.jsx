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
      if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight) + 50) {
        const { dispatch, scrollFunc } = this.props;
        // dispatch(scrollFunc());
        scrollFunc();
      }
    }

    render() {
      return <InnerComponent {...this.props} />;
    }
  }

  InfiniteScrollComponent.propTypes = {
    dispatch: PropTypes.func.isRequired,
    scrollFunc: PropTypes.func.isRequired,
  };

  return InfiniteScrollComponent;
}
