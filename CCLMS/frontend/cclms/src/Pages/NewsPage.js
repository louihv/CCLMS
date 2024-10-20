import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './NewsPage.module.css';
import ArticleCard from '../Components/ArticleCard';

const NewsPage = () => {
    const [articles, setArticles] = useState([]);
    
    useEffect(() => {
      const fetchArticles = async () => {
        const response = await axios.get('/api/news'); // Adjust as necessary
        setArticles(response.data);
      };
      fetchArticles();
    }, []);
  
    return (
      <div className={styles.newsContainer}>
        {/* Render article cards with IDs */}
        {articles.map(article => (
          <ArticleCard
            key={article._id}
            id={article._id} // Pass article ID
            imageSrc={article.image}
            title={article.title}
            description={article.description}
          />
        ))}
      </div>
    );
  };
  

export default NewsPage;
