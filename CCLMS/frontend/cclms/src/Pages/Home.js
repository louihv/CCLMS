import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './Home.css'; // Import CSS for styling
import dailyprophet from './Images/DailyProphet.jpg';
import workspace from './Images/Workspace.1.jpg';
import sortinghat from './Images/SortingHat.png';

const Home = () => {
  return (
    <div className="container">
      <main className="main">
        <div className="featured">
          <div className="featuredContainer">
            <h1 className="featuredTitle">Finals Pressure: Surviving the Exam Season at Hogwarts</h1>
            <p className="featuredDesc">
              With finals looming at Hogwarts, students are under pressure to excel. Late-night studying,
              practical preparations, and house rivalries create a tense atmosphere. Friends rally together for
              support, while magical remedies help ease stress. Once exams conclude, a festive feast in the Great Hall
              celebrates their hard work and marks the end of a challenging season.
            </p>
            <button className="buttonStyle">Check it out!</button>
          </div>
        </div>
        <section className="featuredSection">
          <div className="grid">
            {/* Article Cards */}
            <ArticleCard
              className='dailyprophet'
              imageSrc={dailyprophet} // Assuming it's in the public folder
              title="Daily Prophet"
              description="Your go-to source for the latest news and events in the wizarding world. Stay informed and engaged!"
              targetPath="/hogwartsherald" // Path to navigate to
            />
            <ArticleCard
              className='workspace'
              imageSrc={workspace}
              title="Wizarding Workspace"
              description="A centralized dashboard for wizards to manage spells, track magical tasks, and access essential resources for their enchanting adventures."
              targetPath="/dashboard" // Path to navigate to
            />
            <ArticleCard 
              className='sorting'
              imageSrc={sortinghat}
              title="Sorting Hat"
              description="Experience the magic of the Sorting Hat as it determines your Hogwarts house through a fun and interactive quiz, guiding you to your true magical home!"
              targetPath="/sortinghat" // Path to navigate to
            />
          </div>
        </section>
      </main>
    </div>
  );
};

const ArticleCard = ({ imageSrc, title, description, targetPath }) => {
  const navigate = useNavigate(); // Initialize useNavigate hook for navigation

  const handleClick = () => {
    // Navigate to the specified path when the card is clicked
    navigate(targetPath);
  };

  return (
    <article className="card" onClick={handleClick}>
      <img src={imageSrc} alt={title} className="cardImage" />
      <h3 className="cardTitle">{title}</h3>
      <p className="cardDesc">{description}</p>
    </article>
  );
};

export default Home;
