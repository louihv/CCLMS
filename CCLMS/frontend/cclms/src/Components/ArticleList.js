import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './ArticleList.module.css';

const ArticleList = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/articles'); // Fetch articles with image URLs
        setArticles(response.data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, []);

  // Separate articles by category
  const categorizedArticles = {
    News: articles.filter(article => article.category === 'News'),
    Features: articles.filter(article => article.category === 'Features'),
    Events: articles.filter(article => article.category === 'Events'),
  };

  return (
    <div className={styles.articleListContainer}>
      {/* Hero Heading Section */}
      <div className={styles.heroSection}>
        <h1 className={styles.heroTitle}>The Hogwarts Herald</h1>
        <p className={styles.heroSubtitle}>Your Magical Source for News, Features, and Events</p>
      </div>

      {/* Render articles by category */}
      {Object.entries(categorizedArticles).map(([category, articles]) => (
        <div key={category} className={styles.categorySection}>
          <h2 className={styles.categoryTitle}>{category}</h2>
          <ul className={styles.articleList}>
            {articles.map(article => (
              <li key={article._id} className={styles.articleItem}>
                {article.image && (
                  <img
                    src={`http://localhost:5000${article.image}`}  // Use the image URL from the article data
                    alt={article.title}
                    className={styles.articleImage}
                  />
                )}
                <h3>{article.title}</h3>
                <p>{article.description}</p>
                <Link to={`/articles/${article._id}`}>Read More</Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ArticleList;
