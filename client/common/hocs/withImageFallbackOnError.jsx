import React from 'react';
import PropTypes from 'prop-types';
import { getDisplayName } from 'common/utils/hocUtils';
import defaultTrackFallbackImage from 'assets/images/default-track.png';

export default function withImageFallbackOnError(ImageComponent) {
  class FallbackImage extends React.Component {
    constructor(props) {
      super(props);
      // Set initial state
      this.state = {
        fallback: false,
      };
      this.handleError = this.handleError.bind(this);
    }

    handleError() {
      const { onError } = this.props;

      this.setState({ fallback: true });

      // If onError specified, call it.
      if (onError) {
        onError();
      }
    }

    render() {
      return (
        <ImageComponent
          onError={this.handleError}
          {...this.props}
          src={this.state.fallback ? this.props.fallbackSrc : this.props.src}
        />
      );
    }
  }

  FallbackImage.defaultProps = {
    fallbackSrc: defaultTrackFallbackImage,
  };

  FallbackImage.propTypes = {
    src: PropTypes.string,
    fallbackSrc: PropTypes.string,
    onError: PropTypes.func,
  };

  FallbackImage.displayName = `WithImageFallbackOnError(${getDisplayName(ImageComponent)})`;

  return FallbackImage;
}
