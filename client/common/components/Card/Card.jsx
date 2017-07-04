import styled from 'styled-components';
import {
  BACKGROUND_COLOR,
  BOX_SHADOW_COLOR,
  THEME_COLOR,
  FONT_COLOR_SECONDARY,
} from 'app/css/colors';
import RouterLink from 'common/components/links/RouterLink';
import CardButton from './CardButton';

const Card = styled.div`
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
  color: ${FONT_COLOR_SECONDARY};
`;

Card.SubLink = RouterLink.extend`
    display: inline-block;
    margin-left: 10px;
    color: ${FONT_COLOR_SECONDARY};
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 32px; /* Vertical align!! It should be equal to the height of avatar */
    max-height: 32px;
    max-width: 160px;
    font-size: 0.9rem;
`;

Card.InnerSpan = styled.span`
  margin-right: 5px;
`;

Card.ImageWrapper = styled.div`
  width: 206px;
  height: 206px;
`;

export default Card;