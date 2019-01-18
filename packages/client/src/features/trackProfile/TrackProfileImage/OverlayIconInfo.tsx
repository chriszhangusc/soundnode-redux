import * as React from 'react';
import Icon from '@soundnode-redux/client/src/common/components/icons/Icon';

type Props = {
  name: string;
  active?: boolean;
  info?: React.ReactChild;
};

function OverlayIconInfo({ name, active = false, info }: Props) {
  return (
    <span>
      <Icon iconName={name} active={active} />
      {info}
    </span>
  );
}

export default OverlayIconInfo;
