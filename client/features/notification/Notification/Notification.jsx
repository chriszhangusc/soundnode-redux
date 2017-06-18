import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { removeNotification } from '../notificationActions';

const colorSuccess = '#51A351';
const colorWarning = '#f89406';
const colorInfo = '#58abc3';
const colorDanger = '#bd362f';

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
      case 'danger':
        return colorDanger;
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
  margin-bottom: 15px;
  width: ${width};
  /* transform: translateX(${props => (props.dismiss ? width : 0)}); */
  transition: all .5s ease-in-out;
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
        return '';
    }
  }

  render() {
    const { id, type, title, message, handleOnClick } = this.props;
    return (
      <Wrapper
        type={type}
        onClick={() => {
          handleOnClick();
        }}
      >
        <IconWrapper>
          <Icon className={this.getIconByType(type)} />
        </IconWrapper>
        <ContentWrapper>
          <Header>{title}</Header>
          <Message>{message}</Message>
        </ContentWrapper>
      </Wrapper>
    );
  }
}

Notification.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['success', 'info', 'warning']).isRequired,
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
