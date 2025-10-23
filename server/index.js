/**
 * IMPORTANT: New Relic must be the first require in your application
 * This ensures the agent can instrument all your dependencies
 */
require('newrelic');

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const logger = require('./logger');
const db = require('./database');

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path}`);
  next();
});

// ============================================
// ROUTES - Various scenarios for monitoring
// ============================================

/**
 * Health check endpoint
 */
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

/**
 * Fast endpoint - Normal response time
 */
app.get('/api/users', async (req, res) => {
  try {
    const users = await db.getAllUsers();
    res.json({ success: true, data: users });
  } catch (error) {
    logger.error('Error fetching users:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * Slow endpoint - Simulates slow database query
 * This will show up in New Relic as a performance issue
 */
app.get('/api/slow-query', async (req, res) => {
  const delay = parseInt(req.query.delay) || 3000;
  logger.info(`Executing slow query with ${delay}ms delay`);
  
  try {
    await new Promise(resolve => setTimeout(resolve, delay));
    const users = await db.getAllUsers();
    res.json({ 
      success: true, 
      message: `Intentionally slow response (${delay}ms)`,
      data: users 
    });
  } catch (error) {
    logger.error('Error in slow query:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * Memory intensive endpoint - Simulates high memory usage
 */
app.get('/api/memory-intensive', (req, res) => {
  const size = parseInt(req.query.size) || 1000000;
  logger.info(`Creating large array with ${size} elements`);
  
  try {
    // Create a large array to consume memory
    const largeArray = new Array(size).fill(0).map((_, i) => ({
      id: i,
      data: 'x'.repeat(100),
      timestamp: new Date().toISOString()
    }));
    
    res.json({ 
      success: true, 
      message: `Created array with ${largeArray.length} elements`,
      memoryUsage: process.memoryUsage()
    });
  } catch (error) {
    logger.error('Error in memory intensive operation:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * Error endpoint - Randomly throws errors
 * This helps practice error tracking in New Relic
 */
app.get('/api/random-error', (req, res) => {
  const random = Math.random();
  
  if (random < 0.3) {
    logger.error('Random error occurred!');
    throw new Error('Random error occurred! This is for testing error tracking.');
  } else if (random < 0.5) {
    logger.warn('Returning 404 error');
    return res.status(404).json({ 
      success: false, 
      error: 'Resource not found' 
    });
  } else if (random < 0.7) {
    logger.warn('Returning 500 error');
    return res.status(500).json({ 
      success: false, 
      error: 'Internal server error' 
    });
  }
  
  res.json({ success: true, message: 'No error this time!' });
});

/**
 * Create user endpoint - Demonstrates database operations
 */
app.post('/api/users', async (req, res) => {
  const { name, email } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({ 
      success: false, 
      error: 'Name and email are required' 
    });
  }
  
  try {
    const user = await db.createUser(name, email);
    logger.info(`User created: ${user.id}`);
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    logger.error('Error creating user:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * Get user by ID
 */
app.get('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const user = await db.getUserById(id);
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        error: 'User not found' 
      });
    }
    res.json({ success: true, data: user });
  } catch (error) {
    logger.error('Error fetching user:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * External API call simulation - Demonstrates external service monitoring
 */
app.get('/api/external-call', async (req, res) => {
  try {
    logger.info('Simulating external API call');
    
    // Simulate external API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulate API response
    const externalData = {
      service: 'external-api',
      data: { message: 'This simulates an external service call' },
      responseTime: 1500
    };
    
    res.json({ success: true, data: externalData });
  } catch (error) {
    logger.error('Error calling external API:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * Custom metrics endpoint - Demonstrates custom instrumentation
 */
app.get('/api/custom-metrics', (req, res) => {
  const newrelic = require('newrelic');
  
  // Record custom metrics
  newrelic.recordMetric('Custom/BusinessMetric', Math.random() * 100);
  newrelic.recordMetric('Custom/UserActions', 1);
  
  // Add custom attributes to the transaction
  newrelic.addCustomAttribute('customerId', '12345');
  newrelic.addCustomAttribute('planType', 'premium');
  
  logger.info('Custom metrics recorded');
  res.json({ 
    success: true, 
    message: 'Custom metrics recorded in New Relic' 
  });
});

/**
 * Complex operation - Multiple database calls
 */
app.get('/api/complex-operation', async (req, res) => {
  try {
    logger.info('Starting complex operation');
    
    // Multiple sequential operations
    const users = await db.getAllUsers();
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const userDetails = await Promise.all(
      users.slice(0, 3).map(user => db.getUserById(user.id))
    );
    await new Promise(resolve => setTimeout(resolve, 500));
    
    res.json({ 
      success: true, 
      data: {
        totalUsers: users.length,
        sampleUsers: userDetails
      }
    });
  } catch (error) {
    logger.error('Error in complex operation:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error('Unhandled error:', err);
  
  // Send error to New Relic
  require('newrelic').noticeError(err);
  
  res.status(500).json({ 
    success: false, 
    error: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    success: false, 
    error: 'Route not found' 
  });
});

// Initialize database and start server
db.init().then(() => {
  app.listen(PORT, () => {
    logger.info(`🚀 Server running on http://localhost:${PORT}`);
    logger.info(`📊 New Relic monitoring enabled`);
    logger.info(`\nAvailable endpoints for testing:`);
    logger.info(`  GET  /api/health - Health check`);
    logger.info(`  GET  /api/users - Fast endpoint`);
    logger.info(`  GET  /api/slow-query - Slow endpoint (add ?delay=8080)`);
    logger.info(`  GET  /api/memory-intensive - Memory intensive (add ?size=1000000)`);
    logger.info(`  GET  /api/random-error - Random errors`);
    logger.info(`  GET  /api/external-call - External API simulation`);
    logger.info(`  GET  /api/custom-metrics - Custom metrics`);
    logger.info(`  GET  /api/complex-operation - Complex operation`);
    logger.info(`  POST /api/users - Create user`);
    logger.info(`  GET  /api/users/:id - Get user by ID`);
  });
}).catch(err => {
  logger.error('Failed to initialize database:', err);
  process.exit(1);
});

