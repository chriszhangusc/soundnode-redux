import React from 'react';
import LikesListContainer from '../containers/LikesListContainer';

const LikesPageLayout = () => {
  return (
    <div className="container">
      <h1>Likes</h1>
      <LikesListContainer />
    </div>
  );
};

export default LikesPageLayout;
