import React from 'react';
import Nav from './Nav';

export default function App({ children }) {
  return (
    <div>
      <Nav />
      { children }
    </div>
  );
}

App.propTypes = {
  children: React.PropTypes.element.isRequired
};
