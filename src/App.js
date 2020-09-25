import React, {useEffect, useState} from 'react';
import './App.css';
import Home from './components/Home';
import Create from './components/Create';
import Nav from './components/Nav';
import Stats from './components/Stats';
import List from './components/List';
import {API_URL} from './config';
import axios from 'axios';

function App() {

  // Add authentication!
  // Add profile-page
  // See create
  // Add css animations
  // Add shadows etc

  const [moods, setMoods] = useState(null);

  useEffect(() => {
    window.onscroll = function() {myFunction()};
    let navbar = document.getElementById('navbar');
    let sticky = navbar.offsetTop;

    function myFunction() {
      window.pageYOffset >= sticky ? navbar.classList.add('sticky') : navbar.classList.remove('sticky');
    }

    axios.get(`${API_URL}/moods`)
    .then((result) => setMoods(result.data))
    .catch((err) => console.log(err, 'Error'));

  }, [])

  const handleCreate = (e) => {
    e.preventDefault();
    const {mood, weather, activity, keywords} = e.currentTarget;
    const newMood = {
      mood: mood.value.toLowerCase(),
      weather: weather.value.toLowerCase(),
      activity: activity.value.toLowerCase(),
      keywords: keywords.value.toLowerCase().split(' '),
      date: Date.now()
    }
    axios.post(`${API_URL}/moods/create`, newMood)
      .then((result) => {
        let newMood = result.data;
        let clonedMoods = JSON.parse(JSON.stringify(moods));
        clonedMoods.push(newMood);
        setMoods(clonedMoods);
      })
      .catch((err) => console.log(err, 'Error'));
  }

  return (
    <>
      <Nav />
      <div className="content">
        <Home />
        <Create moods={moods} onCreate={handleCreate}/>
        <Stats />
        <List moods={moods}/>
      </div>
    </>
  );
}

export default App;
