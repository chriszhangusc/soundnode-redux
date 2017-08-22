import React from 'react';
import Wrapper from './Wrapper';
import Icon from './Icon';

function NotificationIcon({ className }) {
  return (
    <Wrapper>
      <Icon className={className} />
    </Wrapper>
  );
}

export default NotificationIcon;
