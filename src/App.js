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
  // If you added keyword, make it appear on the list and enable adding new one
  // Add css animations
  // Add shadows etc

  const [moods, setMoods] = useState(null);
  const [dateArr, setDateArr] = useState(null);

  useEffect(() => {
    window.onscroll = function() {myFunction()};
    let navbar = document.getElementById('navbar');
    let sticky = navbar.offsetTop;

    function myFunction() {
      window.pageYOffset >= sticky ? navbar.classList.add('sticky') : navbar.classList.remove('sticky');
    }

    axios.get(`${API_URL}/moods`)
    .then((result) => {
      setMoods(result.data);
      const dates = result.data.reduce((dateArr, mood) => {
        const dbDate = mood.date.split('').splice(0, 10).join('');
        dateArr.push(dbDate);
        return dateArr;
      }, []);
      setDateArr(dates);
    })
    .catch((err) => console.log(err, 'Error'));

  }, [])

  const handleCreate = (e) => {
    e.preventDefault();
    const {mood, weather, activity, keywords} = e.currentTarget;
    let keysArr = Array.from(keywords);
    const chosenKeys = keysArr.filter(word => word.checked);
    const keyValues = chosenKeys.reduce((newArr, obj) => {
      newArr.push(obj.value.toLowerCase());
      return newArr;
    }, [])
    const newMood = {
      mood: mood.value.toLowerCase(),
      weather: weather.value.toLowerCase(),
      activity: activity.value.toLowerCase(),
      keywords: keyValues,
      date: Date.now()
    }
    axios.post(`${API_URL}/moods/create`, newMood)
      .then((result) => {
        const newMood = result.data;
        let clonedMoods = JSON.parse(JSON.stringify(moods));
        clonedMoods.push(newMood);
        setMoods(clonedMoods);

        let clonedDates = JSON.parse(JSON.stringify(dateArr));
        const newDate = newMood.date.split('').splice(0, 10).join('');
        clonedDates.push(newDate);
        setDateArr(clonedDates);
      })
      .catch((err) => console.log(err, 'Error'));
  }

  return (
    <>
      <Nav />
      <div className="content">
        <Home />
        <Create onCreate={handleCreate} dateArr={dateArr}/>
        <Stats />
        <List moods={moods}/>
      </div>
    </>
  );
}

export default App;
