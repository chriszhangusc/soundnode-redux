import React from 'react';
import { CSSTransition } from 'react-transition-group';
import './FadeTransition.css';

function FadeTransition(props) {
  return <CSSTransition {...props} classNames="fade" timeout={500} />;
}

export default FadeTransition;
