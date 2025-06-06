require('dotenv').config();
  const express = require('express');
  const cors = require('cors');
  const bodyParser = require('body-parser');
  const apiRoutes = require('./src/routes/api');
  const errorHandler = require('./src/middleware/errorHandler');

  const app = express();

  // Middleware
  app.use(cors({ origin: 'http://localhost:3000' }));
  app.use(bodyParser.json());
  app.use(express.static('build')); // Serve React build (optional, for production)

  // Mount API routes
  app.use('/api', apiRoutes);

  // Error handling middleware
  app.use(errorHandler);

  // Start the server
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
  app.use(cors({ origin: 'http://localhost:3000' }));