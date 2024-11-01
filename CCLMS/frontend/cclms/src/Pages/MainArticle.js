import React from 'react';
import './MainArticle.css'; // Import the CSS for styling
import exams from './Images/kimi.jpg';

const MainArticle = () => {
  return (
    <div className="articleContainer">
      <header className="articleHeader">
        <h1 className="articleTitle">Finals Pressure: Surviving the Exam Season at Hogwarts</h1>
        <p className="articleAuthor">By Zion J. Sevilla</p>
        <p className="articleDate">Published on October 23, 2024</p>
      </header>
      <img src= {exams} alt="Hogwarts" className="articleImage" />
      <section className="articleBody">
  <p>
    As the season of finals approaches at Hogwarts, an air of tension fills the castle. Students feel the weight of their studies pressing down on them, with long nights spent in the library and frantic revision sessions becoming the norm. The enchanting corridors, usually buzzing with laughter, are now filled with whispers of spells and incantations as everyone prepares for the challenges ahead.
  </p>
  <p>
    Each student faces their own unique pressures: whether it's mastering complex potions, perfecting charms, or preparing for the dreaded Defense Against the Dark Arts practical exam. The excitement of learning magic is often overshadowed by the anxiety of performance and the fear of failure. Even the Sorting Hat’s song, which once inspired dreams of adventure, now feels like a distant memory amidst the looming dread of assessments.
  </p>
  <p>
    Amidst this high-pressure environment, friendships can become strained as competition heats up. The race for top marks and the prestigious House Cup can turn allies into rivals, with study groups often leading to late-night debates that can escalate into heated arguments. Yet, in these moments of stress, the importance of support and camaraderie shines through, reminding students that they are not alone in their struggles.
  </p>
  <p>
    As the exams draw nearer, it's essential for students to find balance amidst the chaos. Whether it's taking a break to enjoy a Butterbeer in the Three Broomsticks or finding solace in the Forbidden Forest, the journey through finals is not just about academic success; it’s about learning resilience and the importance of self-care. The magical world of Hogwarts teaches valuable lessons that extend beyond the classroom, preparing students for the trials of life ahead.
  </p>
</section>
    </div>
  );
};

export default MainArticle;
