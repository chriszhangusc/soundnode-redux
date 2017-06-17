// Need better implementation!
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import {
  isNotificationHidden,
  getNotificationMessage,
  getNotificationType,
} from 'client/features/notification/notificationSelectors';
import { hideNotification } from 'client/features/notification/notificationActions';

const colorSuccess = '#51A351';
const colorWarning = '#f89406';
const colorInfo = '#58abc3';
const width = '300px';

const Wrapper = styled.div`
  display: flex;
  background-color: ${(props) => {
    switch (props.type) {
      case 'success':
        return colorSuccess;
      case 'warning':
        return colorWarning;
      case 'info':
        return colorInfo;
      default:
        return 'transparent';
    }
  }};
  opacity: ${props => !props.type && 0};
  box-sizing: border-box;
  padding: 20px;
  border-radius: 2px;
  cursor: pointer;
  font-size: 1em;
  line-height: 1.2em;
  position: fixed;
  right: 0;
  top: 100px;
  margin-top: 15px;
  width: ${width};
  transform: translateX(${props => (props.notificationHidden ? width : '0')});
  transition: all .5s ease-in-out;
  &:hover, &:focus {
    opacity: 1;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
`;

const Icon = styled.i`
  display: inline-block;
  font-size: 2rem;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.h1`
  margin: 0;
  font-size: 1rem;
  font-weight: bold;
  margin: 0 0 5px 0;
`;

const Message = styled.p`
  margin: 0;
  font-size: 0.9rem;
`;

class Notification extends React.Component {
  render() {
    const { type, hidden, message, handleNotificationHide } = this.props;
    return (
      <Wrapper type={type} onClick={handleNotificationHide} notificationHidden={hidden}>
        <IconWrapper>
          <Icon
            className={type === 'success' ? 'fa fa-check-circle' : 'fa fa-exclamation-triangle'}
          />
        </IconWrapper>
        <ContentWrapper>
          <Header>{type.toUpperCase()}</Header>
          <Message>{message}</Message>
        </ContentWrapper>
      </Wrapper>
    );
  }
}

Notification.propTypes = {
  handleNotificationHide: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  hidden: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  return {
    hidden: isNotificationHidden(state),
    type: getNotificationType(state),
    message: getNotificationMessage(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleNotificationHide() {
      dispatch(hideNotification());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
