import React from 'react';
import {Link} from 'react-router-dom';
import { Redirect } from 'react-router-dom';

export default function Signup(props) {
 
  if (props.toHome) {
    return <Redirect to={'/'}/>
  }

  return (
    <>
    <form onSubmit={props.onSignUp}>
      <input type="text" name="username" placeholder="Choose a username"></input>
      <input type="email" name="email" placeholder="Enter your email"></input>
      <input type="password" name="password" placeholder="Choose a password"></input>
      <button type="submit">Sign Up</button>
    </form>
    <Link to="/signin">Sign In</Link>
    </>
  )
}
