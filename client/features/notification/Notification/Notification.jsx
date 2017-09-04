import React from 'react';
import PropTypes from 'prop-types';
import FlexColumn from 'common/components/layouts/FlexColumn';
import { connect } from 'react-redux';
import { removeNotification } from '../notificationActions';
import NotificationIcon from './NotificationIcon';
import Wrapper from './Wrapper';
import Header from './Header';
import Message from './Message';

class Notification extends React.Component {
  getIconNameByType(type) {
    switch (type) {
      case 'success':
        return 'check-circle';
      case 'warning':
        return 'exclamation-triangle';
      case 'info':
        return 'info-circle';
      case 'danger':
        return 'times';
      default:
        return 'question-circle';
    }
  }

  render() {
    const { type, title, message, handleOnClick } = this.props;
    return (
      <Wrapper
        type={type}
        onClick={() => {
          handleOnClick();
        }}
      >
        <NotificationIcon iconName={this.getIconNameByType(type)} iconSize="2x" />
        <FlexColumn>
          <Header>
            {title}
          </Header>
          <Message>
            {message}
          </Message>
        </FlexColumn>
      </Wrapper>
    );
  }
}

Notification.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['success', 'info', 'warning', 'danger']).isRequired,
  message: PropTypes.string.isRequired,
  handleOnClick: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch, { id }) {
  return {
    handleOnClick() {
      dispatch(removeNotification(id));
    },
  };
}

export default connect(null, mapDispatchToProps)(Notification);
