import React from 'react';
import moment from 'moment';

export default function ListItem(props) {

  const {mood, date, weather, keywords, activity} = props.mood;

  const goodDate = moment(date).format('DD MMMM YYYY');

  return (
    <li className="listitem">{goodDate}: 
      <ul className="listsub">
        <li >Mood: {mood}</li>
        <li >Weather: {weather}</li>
        <li >Activity level: {activity}</li>
        <li >Keywords:  
          {
            keywords.map((word, i) => {
              return ' ' + (i === keywords.length - 1 ? word : word + ',');
            })
          }
        </li>
      </ul>
    </li>
  )
}
