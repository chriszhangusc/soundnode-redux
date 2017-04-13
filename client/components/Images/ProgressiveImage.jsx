import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';

class ProgressiveImage extends Component {

  constructor(props) {
    super(props);

    // Set initial state
    this.state = {
      smallLoaded: false,
      largeLoaded: false,
    };

    this.onSmallImageLoaded = this.onSmallImageLoaded.bind(this);
    this.onSmallImageError = this.onSmallImageError.bind(this);
    this.onLargeImageLoaded = this.onLargeImageLoaded.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !isEqual(this.state, nextState);
  }

  onSmallImageLoaded() {
    console.log('Small loaded');
    this.setState({
      smallLoaded: true,
    });
  }

  onSmallImageError() {
  }

  onLargeImageLoaded() {
    this.setState({
      largeLoaded: true,
    });
  }

  render() {
    const { smallImgUrl, largeImgUrl, placeholderClassName, onClick } = this.props;
    return (
      <div className={`${placeholderClassName} progressive-img-placeholder`}>
        <img
          alt="Small"
          onLoad={this.onSmallImageLoaded}
          src={smallImgUrl}
          className={`progressive-img-small ${this.state.smallLoaded ? 'loaded' : ''}`}
        />
        <img
          alt="Large"
          onClick={onClick}
          src={largeImgUrl}
          className={`progressive-img-large ${this.state.largeLoaded ? 'loaded' : ''}`}
          onLoad={this.onLargeImageLoaded}
        />
      </div>
    );
  }
}

ProgressiveImage.defaultProps = {
  smallImgUrl: 'default img url',
  placeholderClassName: 'progressive-img-placeholder',
  onClick: () => { console.log('This is default onClick handler'); },
};

ProgressiveImage.propTypes = {
  smallImgUrl: PropTypes.string,
  largeImgUrl: PropTypes.string.isRequired,
  placeholderClassName: PropTypes.string,
  onClick: PropTypes.func,
};

export default ProgressiveImage;
