import React from 'react';
import * as Redux from 'react-redux';
import * as actions from 'actions';

export const Login = React.createClass({
  onLogin: function () {
    var { dispatch } = this.props;
    dispatch(actions.startLogin());
  },
  render : function () {
    return (
      <div>
        <h1 className="page-title">Todo App</h1>
        <div className="row">
          <div className="columns small-centered small-10 medium-6 large-4">
            <div className="callout callout-auth">
              <h3>Login</h3>
              <p>
                Login with GitHub account below.
              </p>
              <button className="button" onClick={this.onLogin}>Login With GitHub</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

});

export default Redux.connect()(Login);
