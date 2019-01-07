import React from 'react';
import { getDisplayName } from '@soundnode-redux/client/src/common/utils/hocUtils';


export default function withImageFadeInOnLoad(ImageComponent) {
  class FadeInImage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        imageLoaded: false,
      };
    }

    handleImageLoaded = () => {
      this.setState({
        imageLoaded: true,
      });
    }

    render() {
      return (
        <ImageComponent
          loaded={this.state.imageLoaded}
          onLoad={this.handleImageLoaded}
          {...this.props}
        />
      );
    }
  }

  FadeInImage.displayName = `WithImageFadeInOnLoad(${getDisplayName(ImageComponent)})`;

  return FadeInImage;
}
