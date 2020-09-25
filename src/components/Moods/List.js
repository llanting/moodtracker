import React from 'react';
import './List.css';
import ListItem from './ListItem';

export default function List(props) {

  if (!props.moods) {
    return <p>Loading...</p>
  }

  return (
    <div id="list">
      <h3>List of moods</h3>
      <ul>
      {
        props.moods.map((mood, i) => {
          return <ListItem key={'mood' + i} mood={mood}/>
        })
      }
      </ul>
    </div>
  )
}
