import React from 'react';
import { CSSTransition } from 'react-transition-group';
import './FadeTransition.css';

function FadeTransition(props) {
  return (
    <CSSTransition {...props} classNames="fade" timeout={{ enter: 500, exit: 500, appear: 500 }} />
  );
}

export default FadeTransition;
