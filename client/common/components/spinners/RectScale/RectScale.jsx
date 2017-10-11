import React from 'react';
import Rect from './Rect';
import Wrapper from './Wrapper';

// Stretch delays in seconds
const delays = [0, -1.1, -1.0, -0.9, -0.8];

function RectScale() {
  return <Wrapper>{delays.map((delay, idx) => <Rect delay={delay} key={idx} />)}</Wrapper>;
}

export default RectScale;
