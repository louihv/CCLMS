import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styles from './CSS/ArticleDetail.module.css'; // Ensure this path is correct
import backup from './Logo-CC.png'; // Optional backup logo

const ArticleDetail = () => {
  const { id } = useParams(); // Get the article ID from the URL
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/articles/${id}`);
        console.log('Fetched article:', response.data); // Log the fetched data
        setArticle(response.data);
      } catch (error) {
        console.error('Error fetching article:', error);
      }
    };

    fetchArticle();
  }, [id]);

  if (!article) return <div>Loading...</div>;

  return (
    <div className={styles.articleContainer}>
      <div className={styles.imageContainer}>
      <img src={`http://localhost:5000${article.image}`} alt={article.title} className={styles.articleImage} />
        <h1 className={styles.articleTitle}>{article.title}</h1>
      </div>
      <p className={styles.articleDescription}>{article.description}</p>
      <article className={styles.articleContent}>
        <div dangerouslySetInnerHTML={{ __html: article.content }} />
      </article>
    </div>
  );
};

export default ArticleDetail;
