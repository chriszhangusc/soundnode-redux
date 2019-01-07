import React from 'react';
import Icon from '@soundnode-redux/client/src/common/components/icons/Icon';
import Wrapper from './Wrapper';

function NotificationIcon(iconProps) {
  return (
    <Wrapper>
      <Icon {...iconProps} />
    </Wrapper>
  );
}

export default NotificationIcon;
