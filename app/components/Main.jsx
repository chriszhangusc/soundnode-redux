import React, {Component} from 'react';
import Nav from 'Nav';
import Songs from 'Songs';

class Main extends Component {
  render () {
    return (
      <div>
        <Nav />
        <Songs />
      </div>
    );
  }
}

export default Main;
