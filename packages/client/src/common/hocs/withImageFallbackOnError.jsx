import React from 'react';
import PropTypes from 'prop-types';
import { getDisplayName } from '@soundnode-redux/client/src/common/utils/hocUtils';
import defaultTrackSrc from 'assets/images/default-track.png';

export default function withImageFallbackOnError(ImageComponent) {
  class FallbackImage extends React.Component {
    constructor(props) {
      super(props);
      // Set initial state
      this.state = {
        fallback: false,
      };
    }
    // This is for flow
    // props: {
    //   src: ?string,
    //   fallbackSrc?: string,
    //   onError?: Function,
    // };

    handleError = () => {
      const { onError } = this.props;

      this.setState({ fallback: true });

      // If onError specified, call it.
      if (onError) {
        onError();
      }
    }

    // If src is null/undefined
    render() {
      const { src = null } = this.props;
      return (
        <ImageComponent
          {...this.props}
          onError={this.handleError}
          src={!src || this.state.fallback ? this.props.fallbackSrc : this.props.src}
        />
      );
    }
  }

  FallbackImage.defaultProps = {
    fallbackSrc: defaultTrackSrc,
    onError: null,
    src: null,
  };

  FallbackImage.propTypes = {
    src: PropTypes.string,
    fallbackSrc: PropTypes.string,
    onError: PropTypes.func,
  };

  FallbackImage.displayName = `WithImageFallbackOnError(${getDisplayName(ImageComponent)})`;

  return FallbackImage;
}
