import React, { Component } from 'react';
import Loader from 'client/components/Loader/Loader';

class LoadingImage extends Component {
  state = {
    smallLoaded: false,
    largeLoaded: false,
    large: "https://cdn-images-1.medium.com/max/1800/1*sg-uLNm73whmdOgKlrQdZA.jpeg",
  }

  constructor(props) {
    super(props);
    this.onSmallImageLoaded = this.onSmallImageLoaded.bind(this);
    this.onSmallImageError = this.onSmallImageError.bind(this);
    this.onLargeImageLoaded = this.onLargeImageLoaded.bind(this);
  }

  onSmallImageLoaded() {
    console.log('img loaded');
    this.setState({
      smallLoaded: true,
    })
  }

  onSmallImageError() {
    console.log('img error');
  }

  onLargeImageLoaded() {
    console.log('Large image loaded');
    this.setState({
      largeLoaded: true,
    })
  }

  render() {
    return (
      <div className="loading-img-placeholder">
        {!this.state.largeLoaded && <img 
          onLoad={this.onSmallImageLoaded}
          src="https://i1.sndcdn.com/artworks-000209741446-wbwipl-large.jpg"
          className={`loading-img-small ${this.state.smallLoaded ? 'loaded' : ''}`}
        />}
        <img 
          src={this.state.large}
          className={`${this.state.largeLoaded ? 'loaded' : ''}`}
          onLoad={this.onLargeImageLoaded}
        />
      </div>
    );
  }
}

export default LoadingImage;
