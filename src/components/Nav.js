import React from 'react';
import './Nav.css';
import logo from '../logo.png';
import {Link} from 'react-router-dom';

export default function Nav(props) {

  return (
    <>
    <nav id="navbar">
      <Link to="/"><img src={logo} style={{width: '200px', height: 'auto', margin: '5px'}} alt="logo"></img></Link>
      <a href={'#intro'}>Home</a>
      <a href={'#create'}>Create</a>
      <a href={'#stats'}>Stats</a>
      <a href={'#list'}>List</a>
      <button onClick={props.onLogOut}>Log Out</button>
    </nav>
    </>
  )
}
