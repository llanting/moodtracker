import React from 'react';
import './Intro.css';
import bg from '../background.jpg';
import bg2 from '../sara-kurfess-ltE8bDLjX9E-unsplash.jpg';
import bg3 from '../eric-ward-wejhq4J-UNo-unsplash.jpg';

export default function Home() {
  return (
    <div id="intro">
      <h1 className="intro-text">Moodtracker</h1>
      <h3 className="intro-text">Your tool in the battle against depression</h3>
      <p className="intro-text">Those who have had depression in the past or still battling against it know it is important to know what your triggers can be. Moodtracker helps you track your moods and gives insight in what your triggers are.</p>
      {/* <img src={bg3} alt="bg"/> */}
    </div>
  )
}
