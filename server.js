const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const errorHandler = require('./src/middleware/errorMiddleware');
const helmet = require('helmet');
const cors = require('cors');
const hpp = require('hpp');
const path = require('path');

// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

const app = express();

const { rateLimit } = require('express-rate-limit');

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later'
});

// Security Middleware
app.use(helmet());
app.use(cors());
app.use(hpp());

// Apply rate limiting to all requests
app.use(limiter);

// Middleware
app.use(express.json());

// Routes
app.use('/api/users', require('./src/routes/userRoutes'));
app.use('/api/books', require('./src/routes/bookRoutes'));

app.get('/', (req, res) => {
  res.send('API is running...');
});

// 404 Handler for undefined routes
app.use((req, res, next) => {
    const err = new Error(`Can't find ${req.originalUrl} on this server!`);
    err.status = 'fail';
    err.statusCode = 404;
    next(err);
});

// Global Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
