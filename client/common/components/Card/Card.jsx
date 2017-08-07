import styled from 'styled-components';
import CardButton from './CardButton';

const Card = styled.div`
  background-color: ${props => props.theme.colors.bgColor};
  box-shadow: 0 0 12px 8px ${props => props.theme.colors.boxShadowColor};
  padding: 11px;
  width: 230px;
  margin: 10px 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 1px solid ${props => (props.active ? props.theme.colors.themeColor : 'transparent')};
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

Card.Subtitle = styled.span`
  font-size: 0.95rem;
  color: ${props => props.theme.colors.fontColorSub};
`;

Card.InnerSpan = styled.span`margin-right: 5px;`;

export default Card;
