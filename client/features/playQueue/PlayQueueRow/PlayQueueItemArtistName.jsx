import { truncateWidth } from 'app/css/styleUtils';
import PlayQueueItemTitle from './PlayQueueItemTitle';

export default PlayQueueItemTitle.extend`
  color: ${props => props.theme.colors.fontColorSub};
  width: 140px;
  ${truncateWidth('140px')};
`;
