import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import isEqual from 'lodash/isEqual';
import styled from 'styled-components';

import styles from './FadeinImage.css';
// import './FadeInImage.scss';
// Create an <Input> component that'll render an <input> tag with some styles
const FadeinImageContainer = styled.div`
  height: 100%;
  width: 100%;
  display: inline-block;
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
  overflow: hidden;
`;

class FadeinImage extends Component {

  constructor(props) {
    super(props);

    // Set initial state
    this.state = {
      placeholderImageLoaded: false,
      fadeinImageLoaded: false,
    };

    this.onPlaceholderImageLoaded = this.onPlaceholderImageLoaded.bind(this);
    this.onFadeinImageLoaded = this.onFadeinImageLoaded.bind(this);
  }

  // Not sure if this is necessary
  // shouldComponentUpdate(nextProps, nextState) {
  //   return !isEqual(this.state, nextState);
  // }

  onPlaceholderImageLoaded() {
    this.setState({
      placeholderImageLoaded: true,
    });
  }

  onFadeinImageLoaded() {
    this.setState({
      fadeinImageLoaded: true,
    });
  }

  render() {
    const { placeholderSrc, src, onClick } = this.props;
    return (
      <FadeinImageContainer>
        <img
          alt="Placeholder"
          src={placeholderSrc}
          className={this.state.placeholderImageLoaded ? styles.fadeinImagePlaceholderLoaded : styles.fadeinImagePlaceholder}
          onLoad={this.onPlaceholderImageLoaded}
        />
        <img
          alt="Main"
          onClick={onClick}
          src={src}
          className={this.state.fadeinImageLoaded ? styles.fadeinImageLoaded : styles.fadeinImage}
          onLoad={this.onFadeinImageLoaded}
        />
      </FadeinImageContainer>
    );
  }
}

FadeinImage.defaultProps = {
  height: 100,
  width: 100,
  onClick: () => { console.log('This is default onClick handler'); },
};

FadeinImage.propTypes = {
  src: PropTypes.string.isRequired,
  placeholderSrc: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  height: PropTypes.number,
  width: PropTypes.number,
};

export default FadeinImage;
