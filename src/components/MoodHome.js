import React, {useState, useEffect} from 'react';
import Stats from './Moods/Stats';
import List from './Moods/List';
import Create from './Moods/Create';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import {API_URL} from '../config';

export default function MoodHome(props) {

  const [loggedInUser, setLogIn] = useState(props.loggedInUser);
  const [Redirecting, setRedirecting] = useState(false);
  const [moods, setMoods] = useState(null);
  const [dateArr, setDateArr] = useState(null);

  useEffect(() => {
    if(!loggedInUser){
    axios.get(`${API_URL}/user`, {withCredentials: true})
      .then((result) => {
        setLogIn(result.data);
        axios.get(`${API_URL}/moods`, {withCredentials: true})
          .then((res) => {
            let myMoods = res.data.filter((mood) => {
              return mood.userId === result.data._id;
            })
            setMoods(myMoods);
            const dates = myMoods.reduce((dateArr, mood) => {
              const dbDate = mood.date.split('').splice(0, 10).join('');
              dateArr.push(dbDate);
              return dateArr;
            }, []);
            setDateArr(dates);
          })
          .catch((err) => setRedirecting(true));
      })
      .catch(() => setRedirecting(true));
    } else {
      axios.get(`${API_URL}/moods`, {withCredentials: true})
      .then((res) => {
        let myMoods = res.data.filter((mood) => {
          return mood.userId === loggedInUser._id;
        })
        setMoods(myMoods);
        const dates = myMoods.reduce((dateArr, mood) => {
          const dbDate = mood.date.split('').splice(0, 10).join('');
          dateArr.push(dbDate);
          return dateArr;
        }, []);
        setDateArr(dates);
      })
      .catch((err) => console.log(err, 'Error'));
    }
  }, [])

  const handleCreate = (e) => {
    e.preventDefault();
    const {mood, weather, activity, keywords} = e.currentTarget;
    let keysArr = Array.from(keywords);
    const chosenKeys = keysArr.filter(word => word.checked);
    const keyValues = chosenKeys.reduce((newArr, obj) => {
      newArr.push(obj.value.toLowerCase());
      return newArr;
    }, []);
    const newMood = {
      mood: mood.value.toLowerCase(),
      weather: weather.value.toLowerCase(),
      activity: activity.value.toLowerCase(),
      keywords: keyValues,
      date: Date.now(),
      userId: loggedInUser._id
    };
    
    axios.post(`${API_URL}/moods/create`, newMood, {withCredentials: true})
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

  if (Redirecting || props.logOut) {
    return <Redirect to={'/signup'} />
  }
  if (!loggedInUser) {
    return <p>Loading..</p>
  }

  return (
    <>
      <Create onCreate={handleCreate} dateArr={dateArr}/>
      <Stats moods={moods}/>
      <List moods={moods}/>
    </>
  )
}
