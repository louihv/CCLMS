import React, { useState, useRef } from 'react';
import styles from './Fortune.module.css';

const Fortune = () => {
  const [fortune, setFortune] = useState('');
  const targetRef = useRef(null);

  // List of fortune ANO PA PWEDE IDAGDAG DITOWWW

  const fortunes = [
    "A thrilling time is in your near future.",
    "Something lost will soon be found.",
    "Trust your intuition. The universe is guiding you.",                    
    "You will soon receive a pleasant surprise.",
    "An unexpected adventure awaits you.",
    "Positive energy will flow into your life.",
    "Someone close to you has good intentions.",
    "Now is the time to try something new.",
    "A mysterious person will soon cross your path.",
    "A new friendship is blossoming just around the corner",
    "You will soon find clarity in a situation that has been confusing",
    "Embrace the changes coming your way; they will lead to growth",
    "A moment of joy will catch you by surprise today",
    "Your hard work is about to pay off in unexpected ways", 
    "Someone will compliment you today; let it brighten your mood",
    "A secret admirer may reveal themselves soon",
    "You will discover a hidden talent that brings you joy",
    "An opportunity for adventure will present itself when you least expect it", 
    "Your kindness will create ripples of positivity in someone's life today"
  ];

  // Function to scroll to the fortune display section and show a fortune
  const handleClick = () => {
    const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
    setFortune(randomFortune);

    if (targetRef.current) {
      const yOffset = -50; // Adjust as needed
      const y = targetRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.head}>
        <h1>A guide to the right path!</h1>
        <h2>Unlock the mysteries of your life through daily insights.</h2>
      </div>
      <div className={styles.mainthing}>
        <button onClick={handleClick} className={styles.crystal_ball}></button>
        <h2>See your future now, click the crystal ball!</h2>
      </div>
      
      {fortune && (
        <div ref={targetRef} className={styles.fortuneDisplay}>
         
          <div className={styles.fortune}>
          <h3>Your Fortune:</h3>
          <p>{fortune}</p>
        
        </div>
        </div>
      )}
    </div>
  );
};

export default Fortune;
