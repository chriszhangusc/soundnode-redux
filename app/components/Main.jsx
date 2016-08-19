import React from 'react';
import Nav from 'Nav';

const Main = (props) => {
  return (
    <div>
      <Nav />
      <p>React Redux Boilerplate Project</p>
      { props.children }
    </div>
  );
};

export default Main;
