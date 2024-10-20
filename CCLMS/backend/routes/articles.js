const express = require('express');
const Article = require('../models/Articles'); // Adjust the path if necessary
const router = express.Router();

// Get all articles
router.get('/', async (req, res) => {
    try {
        const articles = await Article.find();
        res.json(articles);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch articles' });
    }
});

// Get an article by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const article = await Article.findById(id);
        if (!article) {
            return res.status(404).json({ error: 'Article not found' });
        }
        res.json(article);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch article' });
    }
});

// Create a new article (optional for testing)
router.post('/', async (req, res) => {
    const { title, description, image, category, content } = req.body;
    try {
        const newArticle = new Article({ title, description, image, category, content });
        await newArticle.save();
        res.status(201).json(newArticle);
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: 'Failed to create article.' });
    }
});

module.exports = router;
