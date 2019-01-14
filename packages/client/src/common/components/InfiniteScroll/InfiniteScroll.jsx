import React from 'react';
import PropTypes from 'prop-types';

class InfiniteScroll extends React.Component {
  componentDidMount() {
    window.addEventListener('scroll', this.onScroll, false);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, false);
  }

  onScroll = () => {
    const { onBottomReached } = this.props;

    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      onBottomReached();
    }
  };

  render() {
    const { children } = this.props;

    return children;
  }
}

InfiniteScroll.propTypes = {
  onBottomReached: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};

export default InfiniteScroll;
