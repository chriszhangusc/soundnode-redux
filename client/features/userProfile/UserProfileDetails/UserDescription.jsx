import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FONT_COLOR_SECONDARY } from 'client/app/css/colors';

const UserDescriptionWithStyle = styled.div`
  margin: 10px 0;
  font-size: 1rem;
  overflow: scroll;
  height: 240px;
  width: 500px;
  color: ${FONT_COLOR_SECONDARY};
  white-space: pre-wrap;
`;

function UserDescription({ text }) {
  return <UserDescriptionWithStyle>{text}</UserDescriptionWithStyle>;
}

UserDescription.defaultProps = {
  text: '',
};

UserDescription.propTypes = {
  text: PropTypes.string,
};

export default UserDescription;
