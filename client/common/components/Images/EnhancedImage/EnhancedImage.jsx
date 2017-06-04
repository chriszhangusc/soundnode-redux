import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const EnhancedImageContainer = styled.div`
  height: 100%;
  width: 100%;
  border-radius: ${props => props.circle && '50%'};
  background-image: ${props => props.fallback && 'linear-gradient(135deg,#846170,#8e8485)'};
  display: inline-block;
  overflow: hidden;
`;

const Image = styled.img`
  opacity: ${props => (props.loaded ? 1 : 0)};
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
      enhancedImageLoaded: false,
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
      enhancedImageLoaded: true,
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
    const { src, onClick, circle } = this.props;

    return (
      <EnhancedImageContainer circle={circle} fallback={this.state.fallback}>
        {!this.state.fallback &&
          <Image
            loaded={this.state.enhancedImageLoaded}
            alt="Main"
            onClick={onClick}
            src={src}
            onLoad={this.handleOnEnhancedImageLoaded}
            onError={this.handleOnError}
          />}
      </EnhancedImageContainer>
    );
  }
}

EnhancedImage.defaultProps = {
  src: null,
  onClick: null,
  circle: false,
  onError: null,
};

EnhancedImage.propTypes = {
  src: PropTypes.string,
  circle: PropTypes.bool,
  onClick: PropTypes.func,
  onError: PropTypes.func,
};

export default EnhancedImage;
