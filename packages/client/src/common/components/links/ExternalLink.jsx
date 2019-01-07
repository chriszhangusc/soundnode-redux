import styled from 'styled-components';
import Link from '@soundnode-redux/client/src/common/components/links/Link';

const ExternalLink = styled(Link).attrs({
  target: '_blank',
  rel: 'nofollow',
})``;

export default ExternalLink;
