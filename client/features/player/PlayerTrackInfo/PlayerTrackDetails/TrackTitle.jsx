import RouterLink from 'common/components/links/RouterLink';
import { truncateMaxWidth } from 'app/css/styleUtils';

export default RouterLink.extend`
  font-size: 1.05rem;
  ${truncateMaxWidth('100%')};
`;
