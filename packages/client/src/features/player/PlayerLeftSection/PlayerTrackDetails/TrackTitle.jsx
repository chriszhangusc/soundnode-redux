import RouterLink from '@soundnode-redux/client/src/common/components/links/RouterLink';
import { truncateMaxWidth } from '@soundnode-redux/client/src/app/css/styleUtils';

export default RouterLink.extend`
  font-size: 1.05rem;
  ${truncateMaxWidth('100%')};
`;
