import { FONT_COLOR_SECONDARY } from 'app/css/colors';
import RouterLink from 'common/components/links/RouterLink';

const StyledDropdownRowLink = RouterLink.extend`
  display: block;
  line-height: 35px;
  text-align: center;
  color: ${FONT_COLOR_SECONDARY};
  font-size: 0.9rem;
  padding: 5px;
  &:hover {
    color: ${FONT_COLOR_SECONDARY};
  }
`;

export default StyledDropdownRowLink;
