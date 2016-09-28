import React from 'react';
import { connect } from 'react-redux';
import { startLogin, startLogout } from '../actions/auth';

const Login = ({ dispatch }) => (
  <div>
    <a className="btn btn-block btn-social btn-twitter">
      <span className="fa fa-twitter"></span>
      Sign in with Twitter
    </a>
    <button onClick={() => dispatch(startLogin())} >Sign In With Github</button>
    <button onClick={() => dispatch(startLogout())}>Sign Out</button>
  </div>
);


export default connect()(Login);
