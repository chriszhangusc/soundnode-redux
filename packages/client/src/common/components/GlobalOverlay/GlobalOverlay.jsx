// import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
// import FadeTransition from '@soundnode-redux/client/src/common/components/transitions/FadeTransition';
// import { TransitionGroup } from 'react-transition-group';
import disableScroll from '@soundnode-redux/client/src/common/hocs/withScrollDisabled';

const Overlay = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0px;
  left: 0px;
  background: rgba(0, 0, 0, 0.5);
  transition: opacity 500ms ease-out;
  display: flex;
  text-align: center;
  font-size: 1.1em;
  z-index: ${props => props.theme.zIndexes.fullScreenOverlay};
`;

// function GlobalOverlay({ active, onClick, children }) {
//   return (
//     <div onClick={onClick}>
//       <TransitionGroup>
//         {active && (
//           <FadeTransition key="global-overlay">
//             <Overlay>{children}</Overlay>
//           </FadeTransition>
//         )}
//       </TransitionGroup>
//     </div>
//   );
// }

export default disableScroll(Overlay);
