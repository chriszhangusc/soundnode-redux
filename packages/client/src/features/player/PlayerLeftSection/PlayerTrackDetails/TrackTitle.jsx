import styled from 'styled-components';
import RouterLink from '@soundnode-redux/client/src/common/components/links/RouterLink';
import { truncateMaxWidth } from '@soundnode-redux/client/src/app/css/styleUtils';

export default styled(RouterLink)`
  font-size: 1.05rem;
  ${truncateMaxWidth('100%')};
`;
