import React from 'react';
import './Home.css'; // Import the CSS file



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
            {/* Sample Cards */}
            <ArticleCard
              imageSrc="path/to/image1.jpg"
              title="Hogwarts Herald"
              description="Your go-to source for the latest news and events in the wizarding world. Stay informed and engaged!"
            />
            <ArticleCard
              imageSrc="path/to/image2.jpg"
              title="Wizarding Workspace"
              description="A centralized dashboard for wizards to manage spells, track magical tasks, and access essential resources for their enchanting adventures."
            />
            <ArticleCard
              imageSrc="path/to/image3.jpg"
              title="Sorting Hat"
              description="Experience the magic of the Sorting Hat as it determines your Hogwarts house through a fun and interactive quiz, guiding you to your true magical home!"
            />
          </div>
        </section>
      </main>
    </div>
  );
};

const ArticleCard = ({ imageSrc, title, description }) => {
  const handleClick = () => {
    // Implement your navigation logic here
    console.log(`${title} card clicked`);
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
