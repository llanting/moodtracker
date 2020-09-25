import React, {useState} from 'react';
import './Create.css';
import moment from 'moment';

export default function Create(props) {
  
  const date = moment()._d;
  const today = moment(date).format('YYYY-MM-DD');

  const [keyword, setKeyword] = useState('');

  const getKeyword = (e) => {
    setKeyword(e.currentTarget.value);
  }

  if (!props.dateArr) {
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
        <table className="checkboxes">
          <tbody>
            <tr>
              <td><input type="checkbox" name="keywords" value="work" id="work" className="column"></input>
              <label htmlFor="work">Work</label></td>

              <td><input type="checkbox" name="keywords" value="weekend" id="weekend" className="column"></input>
              <label htmlFor="weekend">Weekend</label></td>
            </tr>
            <tr>
              <td><input type="checkbox" name="keywords" value="family" id="family" className="column"></input>
              <label htmlFor="family">Family</label></td>

              <td><input type="checkbox" name="keywords" value="friends" id="friends" className="column"></input>
              <label htmlFor="friends">Friends</label></td>
            </tr>
            <tr>
              <td><input type="checkbox" name="keywords" value="coding" id="coding"></input>
              <label htmlFor="coding">Coding</label></td>

              <td><input type="checkbox" name="keywords" value="date" id="date"></input>
              <label htmlFor="date">Date</label></td>
            </tr>
            <tr>
              <td><input type="checkbox" name="keywords" value="reading" id="reading"></input>
              <label htmlFor="reading">Reading</label></td>

              <td><input type="checkbox" name="keywords" value="daylightlamp" id="daylightlamp"></input>
              <label htmlFor="daylightlamp">DL Lamp</label></td>
            </tr>
            <tr>
              <td><input type="checkbox" name="keywords" value="dancing" id="dancing"></input>
              <label htmlFor="friends">Dancing</label></td>

              <td><input type="checkbox" name="keywords" value="drinking" id="drinking"></input>
              <label htmlFor="drinking">Drinking</label></td>
            </tr>
            <tr>
              <td><input type="checkbox" name="keywords" value={keyword} id="own"></input>
              <input htmlFor="own" style={{width: '100px'}} type="text" placeholder="Add your own" onChange={getKeyword}></input></td>
            </tr>
          </tbody>
        </table>
        {
          props.dateArr.includes(today) ? <button type="submit" disabled={true}>You can only add a mood once per day</button> : <button type="submit">Add this mood</button>
        }
      </form>
    </div>
  )
}
