import React, {useState, useEffect} from 'react';
import './Create.css';
import moment from 'moment';
import {API_URL} from '../config';
import axios from 'axios';

export default function Create(props) {

  // Think of better way to get input of keywords: checkboxes with another one for adding your own keywords
  // After create new mood, make button disabled! Because you work with new axios-req here, the state doesn't get updated and doesn't include the new date! So instead of axios req, could you make the dateArr (and possibly button) a prop that you send here?

  const [moods, setMoods] = useState(null);
  const [checkDate, setCheck] = useState(false);

  const date = moment()._d;
  const today = moment(date).format('YYYY-MM-DD');
 
  useEffect(() => {
    axios.get(`${API_URL}/moods`)
    .then((result) => {
      setMoods(result.data);
      let dates = result.data.reduce((dateArr, mood) => {
        let dbDate = mood.date.split('').splice(0, 10).join('');
        dateArr.push(dbDate);
        return dateArr;
      }, [])
      if (dates.includes(today)) setCheck(true);
    })
    .catch((err) => console.log(err, 'Error'));
  }, [])


  if (!moods) {
    return <p>Loading...</p>
  }

  return (
    <div id="create">
      <h3>Enter your mood of today</h3>
      <form className="create-form" onSubmit={props.onCreate}>
        <select name="mood">
          <option value="neutral">Neutral</option>
          <option value="happy">Happy</option>
          <option value="sad">Sad</option>
          <option value="depressed">Depressed</option>
        </select>
        <select name="weather">
          <option value="sunny">Sunny</option>
          <option value="clouds">Clouds</option>
          <option value="rain">Rain</option>
        </select>
        <select name="activity">
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <input name="keywords" type="text" placeholder="Enter keywords with a space between each keyword"></input>
        {
         checkDate ? <button type="submit" disabled={true}>You can only add a mood once per day</button> : <button type="submit">Add this mood</button>
        }
      </form>
    </div>
  )
}
