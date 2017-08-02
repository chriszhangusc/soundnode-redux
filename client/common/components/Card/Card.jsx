import styled from 'styled-components';
import RouterLink from 'common/components/links/RouterLink';
import CardButton from './CardButton';

const Card = styled.div`
  background-color: ${props => props.theme.bgColor};
  box-shadow: 0 0 12px 8px ${props => props.theme.boxShadowColor};
  padding: 11px;
  width: 230px;
  margin: 10px 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 1px solid ${props => (props.active ? props.theme.themeColor : 'transparent')};
`;

Card.IconButton = CardButton;

Card.Column = styled.div`
  display: flex;
  flex-direction: column;
`;

Card.Row = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

Card.Title = RouterLink.extend`
  display: -webkit-box;
  font-size: 1.05rem;
  font-weight: bold;
  overflow: hidden;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  height: 40px;
`;

Card.Subtitle = styled.span`
  font-size: 0.95rem;
  color: ${props => props.theme.fontColorSub};
`;

Card.SubLink = RouterLink.extend`
  margin-left: 10px;
  color: ${props => props.theme.fontColorSub};
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 32px; /* Vertical align!! It should be equal to the height of avatar */
  max-height: 32px;
  max-width: 160px;
  font-size: 0.9rem;
`;

Card.InnerSpan = styled.span`margin-right: 5px;`;

export default Card;
