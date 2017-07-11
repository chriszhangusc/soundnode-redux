import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { CSSTransitionGroup } from 'react-transition-group'; // ES6
import { zIndexNotification } from 'app/css/zIndex';
import { getNotifications } from '../notificationSelectors';
import Notification from '../Notification';
import './NotificationCenter.css';

const Wrapper = styled.div`
  position: fixed;
  top: 100px;
  right: 0;
  z-index: ${zIndexNotification};
`;

function NotificationCenter({ notifications }) {
  return (
    <Wrapper>
      <CSSTransitionGroup
        transitionName="notification-transition"
        transitionAppear
        transitionAppearTimeout={500}
        transitionEnterTimeout={300}
        transitionLeaveTimeout={300}
      >
        {notifications.map(({ id, type, title, message }, idx) => (
          <Notification id={id} type={type} key={idx} title={title} message={message} />
        ))}
      </CSSTransitionGroup>
    </Wrapper>
  );
}

NotificationCenter.propTypes = {
  notifications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

function mapStateToProps(state) {
  return {
    notifications: getNotifications(state),
  };
}

export default connect(mapStateToProps)(NotificationCenter);
