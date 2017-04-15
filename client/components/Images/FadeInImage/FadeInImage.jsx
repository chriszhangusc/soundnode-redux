import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import styles from './FadeinImage.css';
// import './FadeInImage.scss';

class FadeinImage extends Component {

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
    // console.log('Small loaded');
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
      <div className={`${placeholderClassName} ${styles.fadeinImgPlaceholder}`} >
        <img
          alt="Small"
          src={smallImgUrl}
          className={`${styles.fadeinImgSmall} ${this.state.smallLoaded ? styles.loaded : ''}`}
          onLoad={this.onSmallImageLoaded}
        />
        <img
          alt="Large"
          onClick={onClick}
          src={largeImgUrl}
          className={`${styles.fadeinImgLarge} ${this.state.largeLoaded ? styles.loaded : ''}`}
          onLoad={this.onLargeImageLoaded}
        />
      </div>
    );
  }
}

FadeinImage.defaultProps = {
  smallImgUrl: 'default img url',
  placeholderClassName: 'fadein-img-placeholder',
  onClick: () => { console.log('This is default onClick handler'); },
};

FadeinImage.propTypes = {
  smallImgUrl: PropTypes.string,
  largeImgUrl: PropTypes.string.isRequired,
  placeholderClassName: PropTypes.string,
  onClick: PropTypes.func,
};

export default FadeinImage;
