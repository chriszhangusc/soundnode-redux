import React, {Component} from 'react';
import Nav from './Nav';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class App extends Component {
  render () {
    return (
      <div>
        <ReactCSSTransitionGroup
            transitionName="example"
            transitionAppear={true}
            transitionAppearTimeout={500}
          >
        <Nav />
        {this.props.children}
      </ReactCSSTransitionGroup>
      </div>
    );
  }
}

export default App;
