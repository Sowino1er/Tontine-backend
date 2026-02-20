const express = require('express');
const connectDB = require('./config/db');
const groupesRoutes = require('./routes/groupes');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware pour parser JSON
app.use(express.json());

// Routes
app.use('/api/groupes', groupesRoutes);

// Définir le port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
