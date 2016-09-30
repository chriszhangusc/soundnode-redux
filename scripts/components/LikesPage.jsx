import React from 'react';
import LikesContainer from '../containers/LikesContainer';
import Sidebar from './Sidebar';

export default function LikesPage() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-2 sidebar">
          <Sidebar />
        </div>
        <div className="col-sm-8 col-sm-offset-2">
          <div className="container">
            <LikesContainer />
          </div>
        </div>
      </div>
    </div>
  );
}
