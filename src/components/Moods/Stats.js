import React from 'react';
import ActivityPie from '../Stats/ActivityPie';
import HappyPie from '../Stats/HappyPie';
import KeywordPie from '../Stats/KeywordPie';
import WeatherPie from '../Stats/WeatherPie';
import './Stats.css';

export default function Stats(props) {

  if (!props.moods) return <p>Loading...</p>;

  return (
    <div id="stats">
      <h3>Your stats</h3>
      <p className="stats-text">Number of happy days:</p><HappyPie moods={props.moods} />
      <p className="stats-text">Weather on happy days:</p><WeatherPie moods={props.moods} />
      <p className="stats-text">Activity level on happy days:</p><ActivityPie moods={props.moods} />
      <p className="stats-text">Keywords on happy days:</p><KeywordPie moods={props.moods}/>
    </div>
  )
}

