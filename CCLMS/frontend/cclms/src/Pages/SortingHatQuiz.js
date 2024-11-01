import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for API calls
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import styles from './SortingHatQuiz.module.css'; // Import the CSS Module

const questions = [
    {
        question: "Which activity makes you feel the most alive?",
        options: ["Embarking on an adventure", "Diving into a good book", "Competing in sports", "Making something with your hands"],
    },
    {
        question: "Which trait do you admire most in others?",
        options: ["Boldness", "Insight", "Dependability", "Originality"],
    },
    {
        question: "What legacy do you hope to leave behind?",
        options: ["Fearless leadership", "A wealth of knowledge", "Strong relationships", "Inspiring creativity"],
    },
    {
        question: "If you could escape to one place, where would it be?",
        options: ["An enchanted forest", "An endless library", "A bustling sports arena", "A world-class art studio"],
    },
    {
        question: "If you could have a magical companion, which would you choose?",
        options: ["A powerful dragon", "A majestic phoenix", "A mystical unicorn", "A cunning basilisk"],
    },
    {
        question: "Which color speaks to your soul?",
        options: ["Fiery red", "Deep blue", "Vibrant green", "Sunny yellow"],
    },
    {
        question: "What drives you to push forward in life?",
        options: ["The thrill of adventure", "The pursuit of knowledge", "Collaboration with others", "The spark of innovation"],
    },
    {
        question: "Which season feels the most like home to you?",
        options: ["Bright and warm summer", "Crisp and colorful autumn", "Quiet and reflective winter", "Fresh and blossoming spring"],
    },
    {
        question: "What brings you joy in your downtime?",
        options: ["Exploring new places", "Expanding your mind", "Engaging in physical activities", "Creating something unique"],
    },
    {
        question: "When you face a challenge, what’s your approach?",
        options: ["Charge at it full force", "Strategize and plan carefully", "Turn to trusted friends", "Think outside the box"],
    },
];

const houseStyles = {
    Gryffindor: styles.gryffindor,
    Ravenclaw: styles.ravenclaw,
    Hufflepuff: styles.hufflepuff,
    Slytherin: styles.slytherin,
};


const SortingHatQuiz = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [result, setResult] = useState(null);
    const [resultStyle, setResultStyle] = useState(styles.defaultStyle); // Default style

    const navigate = useNavigate(); // Initialize the useNavigate hook

    useEffect(() => {
        const fetchUserProfile = async () => {
            const token = localStorage.getItem('token'); // Get the user token
            if (!token) {
                // If there's no token, redirect to login or another page
                navigate('/login');
                return;
            }

            try {
                const response = await axios.get('http://localhost:5000/api/profile', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const { house } = response.data;
                if (house) {
                    // If the house field is filled, navigate to the profile page
                    navigate('/profile');
                }
            } catch (error) {
                console.error("Error fetching user profile:", error);
                // Optionally handle errors here
            }
        };

        fetchUserProfile();
    }, [navigate]);

    const handleOptionClick = (option) => {
        setAnswers([...answers, option]);
        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            calculateResult();
        }
    };

    const calculateResult = async () => {
        const houses = {
            Gryffindor: 0,
            Ravenclaw: 0,
            Hufflepuff: 0,
            Slytherin: 0,
        };

        answers.forEach((answer) => {
            if (["Embarking on an adventure", "Boldness", "Fearless leadership", "An enchanted forest", "A powerful dragon", "Fiery red", "The thrill of adventure", "Bright and warm summer", "Exploring new places", "Charge at it full force"].includes(answer)) {
                houses.Gryffindor++;
            } 
            else if (["Diving into a good book", "Insight", "A wealth of knowledge", "An endless library", "A majestic phoenix", "Deep blue", "The pursuit of knowledge", "Crisp and colorful autumn", "Expanding your mind", "Strategize and plan carefully"].includes(answer)) {
                houses.Ravenclaw++;
            } 
            else if (["Making something with your hands", "Dependability", "Strong relationships", "A world-class art studio", "A mystical unicorn", "Vibrant green", "Collaboration with others", "Fresh and blossoming spring", "Creating something unique", "Turn to trusted friends"].includes(answer)) {
                houses.Hufflepuff++;
            } 
            else if (["Competing in sports", "Originality", "Inspiring creativity", "A cunning basilisk", "Sunny yellow", "The spark of innovation", "Quiet and reflective winter", "Think outside the box", "Finding creative solutions", "Crafting"].includes(answer)) {
                houses.Slytherin++;
            }
        });

        const sortedHouse = Object.keys(houses).reduce((a, b) => (houses[a] > houses[b] ? a : b));
        setResult(sortedHouse);
        setResultStyle(houseStyles[sortedHouse]); // Set style based on the sorted house


        // Store the house in the database
        const token = localStorage.getItem('token'); // Get the user token
        await axios.put('http://localhost:5000/api/profile', { house: sortedHouse }, {
            headers: { Authorization: `Bearer ${token}` },
        });

    };

    const profNav = () => {
        navigate('/profile');
    };

    return (
        <div className={styles.quizContainer}>
        <div class="sparkles">
            <div class="sparkle"></div>
            <div class="sparkle"></div>
            <div class="sparkle"></div>
            <div class="sparkle"></div>
            <div class="sparkle"></div>
            <div class="sparkle"></div>
        

             <div className={styles.book}>
            {result ? (
                <div className={`${styles.resultContainer} ${resultStyle}`}>
                    <h2 className={styles.resolution}>You are in: {result}!</h2>
                    <button onClick={profNav}>Check Profile</button>
                    <h2 id={styles.welcome}>Welcome to Hogwarts!</h2>
                </div>
            ) : (
                <div className={styles.questionContainer}>
          <div className={styles.pages}>
          <h1>Discover Your Hogwarts Destiny</h1>
          <h2>{questions[currentQuestion].question}</h2>
          
          <div className={styles.answerButtons}>
            <div className={styles.pages1}>
            <div className={styles.options}>
                    {questions[currentQuestion].options.map((option, index) => (
                        <button key={index} onClick={() => handleOptionClick(option)}>
                            {option}
                        </button>
                    ))}
                 </div>
          </div>
          </div>
        </div>
        </div>
            )}
            
            </div>
        </div>
        </div>
    );
};

export default SortingHatQuiz;
