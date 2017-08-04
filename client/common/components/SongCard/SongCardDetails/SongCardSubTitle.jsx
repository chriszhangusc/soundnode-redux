import RouterLink from 'common/components/links/RouterLink';
import { truncateMaxWidth } from 'app/css/styleUtils';

export default RouterLink.extend`
  margin-left: 10px;
  color: ${props => props.theme.fontColorSub};
  line-height: 32px; /* Vertical align!! It should be equal to the height of avatar */
  max-height: 32px;
  font-size: 0.9rem;
  ${truncateMaxWidth('160px')};
  &:hover {
    color: ${props => props.theme.fontColor};
  }
`;
