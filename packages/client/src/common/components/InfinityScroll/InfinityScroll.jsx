import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

class InfinityScroll extends React.Component {
  constructor(props) {
    super(props);
    this.onScroll = _.debounce(this.onScroll, 500);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll, false);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, false);
  }

  onScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      if (this.props.onScroll) {
        this.props.onScroll();
      }
    }
  };

  render() {
    const { children } = this.props;

    return children;
  }
}

InfinityScroll.propTypes = {
  children: PropTypes.node.isRequired,
};

export default InfinityScroll;
