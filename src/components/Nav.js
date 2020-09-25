import React from 'react';
import './Nav.css';
import logo from '../logo.png';

export default function Nav() {

  return (
    <>
    <nav id="navbar">
      <img src={logo} style={{width: '200px', height: 'auto', margin: '5px'}} alt="logo"></img>
      <a href={'#home'}>Home</a>
      <a href={'#create'}>Create</a>
      <a href={'#stats'}>Stats</a>
      <a href={'#list'}>List</a>
    </nav>
    </>
  )
}
