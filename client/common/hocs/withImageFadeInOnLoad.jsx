import React from 'react';
import { getDisplayName } from 'common/utils/hocUtils';


export default function withImageFadeInOnLoad(ImageComponent) {
  class FadeInImage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        imageLoaded: false,
      };
      this.handleImageLoaded = this.handleImageLoaded.bind(this);
    }

    handleImageLoaded() {
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
