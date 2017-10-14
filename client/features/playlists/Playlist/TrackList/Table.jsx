import styled from 'styled-components';
import RouterLink from 'common/components/links/RouterLink';

const Header = styled.div`
  padding-bottom: 10px;
  display: flex;
  flex-direction: row;
`;

const Row = styled.div`
  padding: 8px 0;
  display: flex;
  cursor: pointer;
  align-items: middle;
  border-top: 1px solid ${props => props.theme.colors.separatorDark};
  background: ${props => props.active && props.theme.colors.separatorDark};
  &:hover {
    background: ${props => props.theme.colors.separatorDark};
  }
`;

const Cell = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  width: ${props => props.width};
`;

const HeaderCell = Cell.extend`font-weight: 600;`;

const IdCell = styled.div`
  display: flex;
  color: ${props => props.theme.colors.fontColorSub};
  align-items: center;
  justify-content: center;
  width: 30px;
`;

const HeaderIdCell = IdCell.extend`
  color: ${props => props.theme.colors.fontColor};
`;

const Text = styled.span`
  font-size: 0.95rem;
  max-width: 100%;
`;

const Link = RouterLink.extend`
  font-size: 0.95rem;
  max-width: 100%;
  &:hover {
    text-decoration: underline;
  }
`;

export default {
  Row,
  Cell,
  IdCell,
  Header,
  HeaderCell,
  HeaderIdCell,
  Text,
  Link,
};
