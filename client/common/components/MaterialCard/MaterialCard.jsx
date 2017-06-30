import styled from 'styled-components';
import {
  BACKGROUND_COLOR,
  BOX_SHADOW_COLOR,
  THEME_COLOR,
  FONT_COLOR_SECONDARY,
} from 'app/css/colors';
import { Link } from 'react-router-dom';
import MaterialCardButton from './MaterialCardButton';

const MaterialCard = styled.div`
  background-color: ${BACKGROUND_COLOR};
  box-shadow: 0 0 12px 8px ${BOX_SHADOW_COLOR};
  padding: 11px;
  width: 230px;
  margin: 10px 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 1px solid ${props => (props.active ? THEME_COLOR : 'transparent')};
`;

MaterialCard.IconButton = MaterialCardButton;

MaterialCard.Column = styled.div`
  display: flex;
  flex-direction: column;
`;

MaterialCard.Row = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

MaterialCard.Title = styled(Link)`
    display: -webkit-box;
    font-size: 1.05rem;
    font-weight: bold;
    overflow: hidden;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    height: 40px;
`;

MaterialCard.Subtitle = styled.span`
  font-size: 0.95rem;
  color: ${FONT_COLOR_SECONDARY};
`;

MaterialCard.SubLink = styled(Link)`
    display: inline-block;
    margin-left: 10px;
    color: ${FONT_COLOR_SECONDARY};
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 25px; /* Vertical align!! It should be equal to the height of avatar */
    max-height: 25px;
    max-width: 160px;
    font-size: 0.9rem;
`;

MaterialCard.InnerSpan = styled.span`
  margin-right: 5px;
`;

export default MaterialCard;
