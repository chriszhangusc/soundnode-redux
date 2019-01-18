import styled from 'styled-components';
import Fixed from '@soundnode-redux/client/src/common/components/Fixed';
import { media } from '@soundnode-redux/client/src/app/css/styleUtils';

const PLAY_QUEUE_WIDTH_DESKTOP = '300px';
const PLAY_QUEUE_WIDTH_DESKTOP_LG = '400px';
const PLAY_QUEUE_WIDTH_DESKTOP_4K = '500px';

export default styled(Fixed)`
  top: 70px;
  right: 0;
  bottom: 0;

  ${media.desktop`
    width: ${PLAY_QUEUE_WIDTH_DESKTOP};
    transform: translateX(${props => (props.playQueueHidden ? PLAY_QUEUE_WIDTH_DESKTOP : '0')});
  `};

  ${media.desktopLG`
    width: ${PLAY_QUEUE_WIDTH_DESKTOP_LG};
    transform: translateX(${props => (props.playQueueHidden ? PLAY_QUEUE_WIDTH_DESKTOP_LG : '0')});
  `};

  ${media.desktop4K`
    width: ${PLAY_QUEUE_WIDTH_DESKTOP_4K};
    transform: translateX(${props => (props.playQueueHidden ? PLAY_QUEUE_WIDTH_DESKTOP_4K : '0')});
  `};
  z-index: ${props => props.theme.zIndexes.playQueue};
  padding: 20px 0 0 0;
  overflow-x: hidden;
  overflow-y: scroll;
  padding-bottom: 90px; /* Height of the player */
  width: 300px;
  transform: translateX(${props => (props.playQueueHidden ? '300px' : '0')});
  background-color: ${props => props.theme.colors.bgSub};
  transition: transform 500ms ease-out;
`;
