import React from 'react';
import HappyPie from '../Stats/HappyPie';
import './Stats.css';

export default function Stats(props) {

  if (!props.moods) return <p>Loading...</p>;

  return (
    <div id="stats">
      <h3>Stats!</h3>
      <HappyPie moods={props.moods}/>
    </div>
  )
}

// On happy days: most common weather, most common activity level, most common keywords
