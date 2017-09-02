import Fixed from 'common/components/Fixed';
import { media } from 'app/css/styleUtils';

const PLAY_QUEUE_WIDTH_DESKTOP = '300px';
const PLAY_QUEUE_WIDTH_DESKTOP_LG = '400px';
const PLAY_QUEUE_WIDTH_DESKTOP_4K = '500px';

// #Fix: Media queries are wrong!!
export default Fixed.extend`
${media.desktop`
  width: ${PLAY_QUEUE_WIDTH_DESKTOP};
  transform: translateX${props => (props.playQueueHidden ? PLAY_QUEUE_WIDTH_DESKTOP : '0')};
`};

${media.desktopLG`
  width: ${PLAY_QUEUE_WIDTH_DESKTOP_LG};
  transform: translateX${props => (props.playQueueHidden ? PLAY_QUEUE_WIDTH_DESKTOP_LG : '0')};
`};

${media.desktop4K`
  width: ${PLAY_QUEUE_WIDTH_DESKTOP_4K};
  transform: translateX${props => (props.playQueueHidden ? PLAY_QUEUE_WIDTH_DESKTOP_4K : '0')};
`};

top: 70px;
right: 0;
bottom: 0;
z-index: ${props => props.theme.zIndexes[1]};
padding: 20px 0 0 0;
overflow-x: hidden;
overflow-y: scroll;
transform: translateX(${props => (props.playQueueHidden ? '500px' : '0')});
background-color: ${props => props.theme.colors.bgSub};
transition: all .5s ease-in-out;
`;
