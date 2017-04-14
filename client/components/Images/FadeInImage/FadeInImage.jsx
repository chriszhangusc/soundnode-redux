import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import './FadeInImage.scss';

class FadeInImage extends Component {

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

  // Not sure if this is necessary
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
      <div className={`${placeholderClassName} fadein-img-placeholder`}>
        <img
          alt="Small"
          onLoad={this.onSmallImageLoaded}
          src={smallImgUrl}
          className={`fadein-img-small ${this.state.smallLoaded ? 'loaded' : ''}`}
        />
        <img
          alt="Large"
          onClick={onClick}
          src={largeImgUrl}
          className={`fadein-img-large ${this.state.largeLoaded ? 'loaded' : ''}`}
          onLoad={this.onLargeImageLoaded}
        />
      </div>
    );
  }
}

FadeInImage.defaultProps = {
  smallImgUrl: 'default img url',
  placeholderClassName: 'fadein-img-placeholder',
  onClick: () => { console.log('This is default onClick handler'); },
};

FadeInImage.propTypes = {
  smallImgUrl: PropTypes.string,
  largeImgUrl: PropTypes.string.isRequired,
  placeholderClassName: PropTypes.string,
  onClick: PropTypes.func,
};

export default FadeInImage;
