import React, {useEffect, useState} from 'react';
import './App.css';
import {Switch, Route, withRouter} from 'react-router-dom';
import {API_URL} from './config';
import axios from 'axios';
import Nav from './components/Nav';
import Intro from './components/Intro';
import Signup from './components/User/Signup';
import Signin from './components/User/Signin';
import MoodHome from './components/MoodHome';
import {UserContext} from './UserContext';

function App() {

  // Add profile-page
  // If you added keyword, make it appear on the list and enable adding new one
  // More stats
  // Add css animations
  // Add shadows etc

  const [loggedInUser, setLogIn] = useState(null);
  const [logOut, setLogOut] = useState(false);
  const [toHome, setToHome] = useState(false);

  useEffect(() => {
    window.onscroll = function() {myFunction()};
    let navbar = document.getElementById('navbar');
    let sticky = navbar.offsetTop;

    function myFunction() {
      window.pageYOffset >= sticky ? navbar.classList.add('sticky') : navbar.classList.remove('sticky');
    }

    if(!loggedInUser){
      axios.get(`${API_URL}/user`, {withCredentials: true})
        .then((result) => {
          setLogIn(result.data)
        })
    }
  }, [loggedInUser])

  const handleSignUp = (e) => {
    e.preventDefault();
    const {username, email, password} = e.currentTarget;
    axios.post(`${API_URL}/signup`, {username: username.value, email: email.value, password: password.value},  {withCredentials: true})
      .then((result) => {
        setLogIn(result.data);
        setToHome(true);
      })
      .catch((err) => {
        // setErrStatus(true);
        // let error = err.response.data.error
        // setErr(error);
      })
  }

  const handleSignIn = (e) => {
    e.preventDefault();
    const {email, password} = e.currentTarget;
    axios.post(`${API_URL}/signin`, {email: email.value, password: password.value},  {withCredentials: true})
      .then((result) => {
        setLogIn(result.data);
        setToHome(true);
      })
      // .catch((err) => {
      //   setErrStatus(true);
      //   let error = err.response.data.error
      //   setErr(error);
      // })
  }

  const handleLogOut = () => {
    setToHome(false);
    axios.post(`${API_URL}/logout`, {}, {withCredentials: true})
      .then(() => {
        localStorage.clear();
        setLogIn(null);
        setLogOut(true);
      })
  }

  return (
    <>
      <Nav onLogOut={handleLogOut}/>
      <div className="content">
        <Intro />
        <UserContext.Provider value = {loggedInUser}>
        <Switch>
          <Route exact path="/" render={() => {
            return <MoodHome logOut={logOut} loggedInUser={loggedInUser}/>
          }} />
          <Route path="/signup" render={() => {
              return <Signup toHome={toHome} onSignUp={handleSignUp}/>
          }} />
          <Route path="/signin" render={() => {
              return <Signin toHome={toHome} onSignIn={handleSignIn}/>
          }} />
        </Switch>
        </UserContext.Provider>
      </div>
    </>
  );
}

export default withRouter(App);
