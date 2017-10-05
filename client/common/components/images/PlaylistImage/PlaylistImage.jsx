import React from 'react';
import styled from 'styled-components';
import TrackImage from 'common/components/images/TrackImage';

const Wrapper = styled.div`
  height: 200px;
  width: 200px;
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

// const Col = styled.div`
//   display: flex;
//   flex-direction: column;
// `;

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

function PlaylistImage({ images }) {
  const imageGroup = formatImages(images);
  return (
    <Wrapper>
      <Row>
        <TrackImage src={imageGroup[0]} />
        <TrackImage src={imageGroup[1]} />
      </Row>
      <Row>
        <TrackImage src={imageGroup[2]} />
        <TrackImage src={imageGroup[3]} />
      </Row>
    </Wrapper>
  );
}

export default PlaylistImage;
