import React from 'react';
import PropTypes from 'prop-types';
import FlexColumn from 'common/components/layouts/FlexColumn';
import { connect } from 'react-redux';
import { removeNotification } from '../notificationActions';
import Wrapper from './Wrapper';
import NotificationIcon from './NotificationIcon';
import Header from './Header';
import Message from './Message';

class Notification extends React.Component {
  getIconByType(type) {
    switch (type) {
      case 'success':
        return 'fa fa-check-circle';
      case 'warning':
        return 'fa fa-exclamation-triangle';
      case 'info':
        return 'fa fa-info-circle';
      case 'danger':
        return 'fa fa-times';
      default:
        return 'fa fa-question-circle';
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
        <NotificationIcon className={this.getIconByType(type)} />
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
