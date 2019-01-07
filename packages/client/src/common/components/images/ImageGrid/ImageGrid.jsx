import React from 'react';
import TrackImage from '@soundnode-redux/client/src/common/components/images/TrackImage';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  position: relative;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

function formatImages(images) {
  let imageGroup = images;
  if (images.length === 1) {
    imageGroup = [images[0], images[0], images[0], images[0]];
  } else if (images.length === 2) {
    imageGroup = [images[0], images[1], images[1], images[0]];
  } else if (images.length === 3) {
    imageGroup = [...images, images[0]];
  }
  return imageGroup;
}

function ImageGrid({ images }) {
  if (!images) return null;
  const formattedImages = formatImages(images);
  return (
    <Wrapper>
      <Row>
        <TrackImage src={formattedImages[0]} />
        <TrackImage src={formattedImages[1]} />
      </Row>
      <Row>
        <TrackImage src={formattedImages[2]} />
        <TrackImage src={formattedImages[3]} />
      </Row>
    </Wrapper>
  );
}

export default ImageGrid;
