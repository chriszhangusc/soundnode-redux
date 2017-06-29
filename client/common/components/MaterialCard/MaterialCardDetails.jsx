import React from 'react';
import PropTypes from 'prop-types';
import Avatar from 'common/components/Avatar';
import { Link } from 'react-router-dom';
import { USER_PROFILE_ROUTE, TRACK_PROFILE_ROUTE } from 'common/constants/routeConsts';
import styled from 'styled-components';
import { FONT_COLOR_SECONDARY } from 'app/css/colors';

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Title = styled(Link)`
    display: -webkit-box;
    font-size: 1.05rem;
    font-weight: bold;
    overflow: hidden;
    /* -webkit-line-clamp: 2; */
    -webkit-box-orient: vertical;
    /* height: 40px; */
`;

const Username = styled(Link)`
    display: inline-block;
    margin-left: 10px;
    color: ${FONT_COLOR_SECONDARY};
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 25px; /* Vertical align!! It should be equal to the height of avatar */
    max-width: 160px;
    font-size: 0.9rem;
`;

const AvatarWrapper = styled.div`
  height: 25px;
  width: 25px;
`;

const Subtitle = styled.span`
  font-size: 0.95rem;
  color: ${FONT_COLOR_SECONDARY};
  span: first-child {
    margin-right: 5px;
  }
`;

const InnerText = styled.span`
  margin-right: 5px;
`;

function MaterialCardDetails({ title, userAvatar, username }) {
  // const trackUrl = `${TRACK_PROFILE_ROUTE}/${trackId}`;
  // const userUrl = `${USER_PROFILE_ROUTE}/${userId}`;

  return (
    <Column>
      <Row>
        <Title to="#" title={title}>
          {title}
        </Title>
      </Row>
      <Row>
        <Subtitle>
          <InnerText>4 songs</InnerText>
          <InnerText>•</InnerText>
          <InnerText>12:48</InnerText>
        </Subtitle>
      </Row>
      <Row>
        <Link to="#" title={username}>
          <AvatarWrapper><Avatar src={userAvatar} /></AvatarWrapper>
        </Link>
        <Username to="#" title={username}>
          {username}
        </Username>
      </Row>
    </Column>
  );
}

MaterialCardDetails.propTypes = {
  title: PropTypes.string.isRequired,
  userAvatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};

export default MaterialCardDetails;
