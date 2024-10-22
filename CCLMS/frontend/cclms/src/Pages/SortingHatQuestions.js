import React, { useState } from 'react';
import styles from './SortingHatQuestions.module.css'; 

// Updated questions and answers
const questions = [
  {
    question: "If you could possess one extraordinary ability, what would it be?",
    answers: [
      { text: "Telepathy", house: "Ravenclaw" },
      { text: "Invincibility", house: "Gryffindor" },
      { text: "Manipulation of time", house: "Slytherin" },
      { text: "The power to heal", house: "Hufflepuff" }
    ]
  },
  {
    question: "When faced with a difficult decision, what do you rely on most?",
    answers: [
      { text: "My gut feeling", house: "Gryffindor" },
      { text: "Research and data", house: "Ravenclaw" },
      { text: "The opinions of my close friends", house: "Hufflepuff" },
      { text: "A strategic plan", house: "Slytherin" }
    ]
  },
  {
    question: "What would you do if you found a lost treasure?",
    answers: [
      { text: "Share it with my friends", house: "Hufflepuff" },
      { text: "Use it to pursue my ambitions", house: "Slytherin" },
      { text: "Donate it to a worthy cause", house: "Gryffindor" },
      { text: "Research its origins", house: "Ravenclaw" }
    ]
  },
  {
    question: "In a heated debate, you are most likely to...",
    answers: [
      { text: "Stand firm in your beliefs", house: "Gryffindor" },
      { text: "Listen to all sides before responding", house: "Hufflepuff" },
      { text: "Use logic and facts to persuade others", house: "Ravenclaw" },
      { text: "Try to outsmart your opponent", house: "Slytherin" }
    ]
  },
  {
    question: "What drives you to pursue your goals?",
    answers: [
      { text: "A desire to prove myself", house: "Gryffindor" },
      { text: "A sense of duty to help others", house: "Hufflepuff" },
      { text: "The thrill of intellectual challenge", house: "Ravenclaw" },
      { text: "The ambition to rise to power", house: "Slytherin" }
    ]
  },
  {
    question: "How do you handle failure?",
    answers: [
      { text: "Learn from it and move on", house: "Hufflepuff" },
      { text: "Analyze what went wrong for next time", house: "Ravenclaw" },
      { text: "Use it as motivation to succeed", house: "Gryffindor" },
      { text: "Find a way to turn it to my advantage", house: "Slytherin" }
    ]
  },
  {
    question: "What kind of environment do you thrive in?",
    answers: [
      { text: "One filled with challenges", house: "Gryffindor" },
      { text: "A supportive and collaborative community", house: "Hufflepuff" },
      { text: "A place that stimulates my mind", house: "Ravenclaw" },
      { text: "A competitive atmosphere", house: "Slytherin" }
    ]
  },
  {
    question: "If you could choose a companion animal, what would it be?",
    answers: [
      { text: "A loyal dog", house: "Hufflepuff" },
      { text: "A majestic eagle", house: "Ravenclaw" },
      { text: "A cunning fox", house: "Slytherin" },
      { text: "A brave lion", house: "Gryffindor" }
    ]
  },
  {
    question: "What motivates you to help others?",
    answers: [
      { text: "A sense of justice", house: "Gryffindor" },
      { text: "The joy of making others happy", house: "Hufflepuff" },
      { text: "A desire for knowledge and understanding", house: "Ravenclaw" },
      { text: "The opportunity to gain influence", house: "Slytherin" }
    ]
  },
  {
    question: "When envisioning your future, what do you see?",
    answers: [
      { text: "A legacy of bravery", house: "Gryffindor" },
      { text: "A community built on trust", house: "Hufflepuff" },
      { text: "Achievements that challenge my intellect", house: "Ravenclaw" },
      { text: "A position of power and respect", house: "Slytherin" }
    ]
  }
];

const SortingHatQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState({ Gryffindor: 0, Hufflepuff: 0, Ravenclaw: 0, Slytherin: 0 });
  const [showResult, setShowResult] = useState(false);
  const [house, setHouse] = useState("");
  const userId = localStorage.getItem('userId') || 'defaultUser Id'; // Fetch userId from localStorage or set a default

  const handleAnswerClick = (house) => {
    setScores(prevScores => ({
      ...prevScores,
      [house]: prevScores[house] + 1
    }));
    
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      // Calculate the sorted house
      const sortedHouse = Object.keys(scores).reduce((a, b) => (scores[a] > scores[b] ? a : b));
      setHouse(sortedHouse);
      setShowResult(true);
      
      // Send a request to the backend to update the user's house
      fetch('/api/update-house', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ house: sortedHouse, userId }) // Use the fetched userId
      })
      .then(response => response.json())
      .then(data => {
        console.log('House successfully updated:', data);
      })
      .catch(error => {
        console.error('Error updating house:', error);
      });
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScores({ Gryffindor: 0, Hufflepuff: 0, Ravenclaw: 0, Slytherin: 0 });
    setShowResult(false);
    setHouse("");
  };

  return (
  
    <div className={styles.quizContainer}>
    <div className={styles.book}>
      {showResult ? (
        <div className={styles.result}>
           <div className={styles.pages}></div>
          <h2 id={styles.res}>You belong to {house}!</h2>
          {/* <button className={styles.restartButton} onClick={restartQuiz}>Restart Quiz</button> */}
        </div>
        
      ) : (
        <div className={styles.questionContainer}>
          <div className={styles.pages}>
          <h1>Discover Your Hogwarts Destiny</h1>
          <h2>{questions[currentQuestion].question}</h2>
          </div>
          <div className={styles.answerButtons}>
            <div className={styles.pages1}>
            <div className={styles.options}>
            {questions[currentQuestion].answers.map((answer) => (
              <button key={answer.text} onClick={() => handleAnswerClick(answer.house)}>
                {answer.text}
              </button>
            ))}
           
            </div>
          </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default SortingHatQuiz;