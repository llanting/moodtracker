import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import './Signin.css';
import Intro from '../Intro';

export default function Signin(props) {

  if (props.toHome) {
    return <Redirect to={'/'}/>
  }

  return (
    <>
    <Intro />
    <div className="signin">
      <form className="form-signin" onSubmit={props.onSignIn}>
      <input type="email" name="email" placeholder="Enter your email"></input>
      <input type="password" name="password" placeholder="Choose a password"></input>
      <button type="submit">Sign In</button>
    </form>
    <Link to="/signup">Sign Up</Link>
    </div>
    </>
  )
}
