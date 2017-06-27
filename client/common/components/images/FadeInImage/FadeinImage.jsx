import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const EnhancedImageContainer = styled.div`
  height: 100%;
  width: 100%;
  border-radius: ${props => props.circle && '50%'};
  background-image: ${props => props.fallback && 'linear-gradient(135deg,#846170,#8e8485)'};
  display: inline-block;
  position: relative;
  overflow: hidden;
`;

const BlurryImage = styled.img`
  position: absolute;
  opacity: ${props => (props.loaded ? 1 : 0)};
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  transition: opacity 0.2s linear;
`;

const Image = styled.img`
  position: absolute;
  opacity: ${props => (props.loaded ? 1 : 0)};
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: opacity 0.5s linear;
`;

class EnhancedImage extends Component {
  constructor(props) {
    super(props);
    // Set initial state
    this.state = {
      blurryImageLoaded: false,
      EnhancedImageLoaded: false,
      fallback: false,
    };
    this.handleOnError = this.handleOnError.bind(this);
    this.handleOnBlurryImageLoaded = this.handleOnBlurryImageLoaded.bind(this);
    this.handleOnEnhancedImageLoaded = this.handleOnEnhancedImageLoaded.bind(this);
  }

  handleOnBlurryImageLoaded() {
    this.setState({
      blurryImageLoaded: true,
    });
  }

  handleOnEnhancedImageLoaded() {
    this.setState({
      EnhancedImageLoaded: true,
    });
  }

  handleOnError() {
    const { onError } = this.props;

    this.setState({ fallback: true });

    if (onError) {
      onError();
    }
  }

  render() {
    const { src, blurrySrc, fallbackSrc, onClick, circle } = this.props;

    return (
      <EnhancedImageContainer circle={circle} fallback={this.state.fallback}>
        {blurrySrc &&
          <BlurryImage
            loaded={this.state.blurryImageLoaded}
            alt="Blurry"
            src={blurrySrc}
            onLoad={this.handleOnBlurryImageLoaded}
          />}
        <Image
          loaded={this.state.EnhancedImageLoaded}
          alt="Main"
          onClick={onClick}
          src={this.state.fallback && fallbackSrc ? fallbackSrc : src}
          onLoad={this.handleOnEnhancedImageLoaded}
          onError={this.handleOnError}
        />

      </EnhancedImageContainer>
    );
  }
}

EnhancedImage.defaultProps = {
  onClick: null,
  circle: false,
  onError: null,
  blurrySrc: '',
  fallbackSrc: '',
};

EnhancedImage.propTypes = {
  src: PropTypes.string.isRequired,
  blurrySrc: PropTypes.string,
  fallbackSrc: PropTypes.string,
  circle: PropTypes.bool,
  onClick: PropTypes.func,
  onError: PropTypes.func,
};

export default EnhancedImage;
