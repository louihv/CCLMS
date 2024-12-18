const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path'); // Add this to use path for static files
const Article = require('./models/Articles'); // Ensure this path is correct
const authRoutes = require('./routes/auth'); // Adjust the path according to your project structure
const articlesRoutes = require('./routes/articles'); // Import articles routes

const userRoutes = require('./routes/userRoutes');
const archiveRoutes = require('./routes/archiveRoutes');
const sortingHatRoutes = require('./routes/sortingHatRoutes');
const enrollmentRoutes = require('./routes/enrollmentRoutes');
const profileRoutes = require('./routes/userRoutes'); // Adjust the path based on your project structure

const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON requests
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded requests

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, '../uploads'))); // Adjusted path to point to the correct folder

// Use the routes
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/articles', articlesRoutes); // Articles routes
app.use('/api/users', userRoutes);
app.use('/api/archive', archiveRoutes);

app.use('/api/enrollment', enrollmentRoutes);
app.use('/api', sortingHatRoutes);

// In your server.js or index.js (the main backend file)
app.use('/api', profileRoutes); // Mount the profile routes under the '/api' prefix



// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://sevillazion23:112303zi@charmcasters-cluster.zqwca.mongodb.net/', { // Use environment variable
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log('Serving uploads from:', path.join(__dirname, '../uploads')); // Updated to reflect the correct path
});
