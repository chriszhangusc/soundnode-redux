import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TransitionGroup } from 'react-transition-group';
import FadeTransition from '@soundnode-redux/client/src/common/components/transitions/FadeTransition';
import { getNotifications } from '../notificationSelectors';
import Notification from '../Notification';
import Wrapper from './Wrapper';

function NotificationCenter({ notifications }) {
  const notificationsItems = notifications.map(({ id, type, title, message }, idx) => (
    <FadeTransition key={idx}>
      <Notification id={id} type={type} key={idx} title={title} message={message} />
    </FadeTransition>
  ));

  return (
    <Wrapper>
      <TransitionGroup>{notificationsItems}</TransitionGroup>
    </Wrapper>
  );
}

NotificationCenter.propTypes = {
  notifications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
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
