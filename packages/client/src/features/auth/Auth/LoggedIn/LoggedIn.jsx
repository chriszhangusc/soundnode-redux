import React from 'react';
import AuthAvatar from './AuthAvatar';
import Username from './Username';
import LogoutButton from './LogoutButton';

function LoggedIn({ me }) {
  return (
    <div>
      <AuthAvatar me={me} />
      <Username>
        {me.username}
      </Username>
      <LogoutButton />
    </div>
  );
}

export default LoggedIn;
