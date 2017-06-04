import React from 'react';
import PropTypes from 'prop-types';

// Enhanced Image component which can fallback to specified fallback
// image if the original image is not available.
class FallbackIamge extends React.Component {
  constructor(props) {
    super(props);
    this.state = { fallback: false };
    this.handleError = this.handleError.bind(this);
  }

  handleError() {
    const { onError } = this.props;
    // console.log('error');
    this.setState({ fallback: true });
    if (onError) {
      onError();
    }
  }

  render() {
    const { src, fallbackImageUrl, onError, alt, ...otherProps } = this.props;
    if (this.state.fallback) {
      return <img alt={alt} src={fallbackImageUrl} {...otherProps} />;
    }
    return <img alt={alt} src={src} onError={this.handleError} {...otherProps} />;
  }
}

FallbackIamge.defaultProps = {
  className: '',
  onError: undefined,
  alt: 'Fallback Img',
};

FallbackIamge.propTypes = {
  className: PropTypes.string,
  src: PropTypes.string.isRequired,
  fallbackImageUrl: PropTypes.string,
  alt: PropTypes.string.isRequired,
  onError: PropTypes.func,
};

export default FallbackIamge;
