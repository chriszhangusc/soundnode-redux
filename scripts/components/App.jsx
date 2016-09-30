import React from 'react';
import Nav from './Nav';
import Sidebar from './Sidebar';

// Skeleton layout of our app
export default function App({ children }) {
  return (
    <div>
      <Nav />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-2 sidebar">
            <Sidebar />
          </div>
          <div className="col-sm-8 col-sm-offset-2">
            { children }
          </div>
        </div>
      </div>

    </div>
  );
}

App.propTypes = {
  children: React.PropTypes.element.isRequired
};
