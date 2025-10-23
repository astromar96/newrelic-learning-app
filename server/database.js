const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const logger = require('./logger');

const DB_PATH = path.join(__dirname, '../data/app.db');

let db;

/**
 * Initialize database and create tables
 */
function init() {
  return new Promise((resolve, reject) => {
    // Create data directory if it doesn't exist
    const fs = require('fs');
    const dataDir = path.dirname(DB_PATH);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    db = new sqlite3.Database(DB_PATH, (err) => {
      if (err) {
        logger.error('Error opening database:', err);
        reject(err);
        return;
      }
      
      logger.info('Database connected');
      
      // Create users table
      db.run(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          email TEXT NOT NULL UNIQUE,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `, (err) => {
        if (err) {
          logger.error('Error creating table:', err);
          reject(err);
          return;
        }
        
        // Insert some sample data
        insertSampleData().then(() => {
          logger.info('Database initialized with sample data');
          resolve();
        }).catch(reject);
      });
    });
  });
}

/**
 * Insert sample data for testing
 */
function insertSampleData() {
  return new Promise((resolve, reject) => {
    const sampleUsers = [
      { name: 'Alice Johnson', email: 'alice@example.com' },
      { name: 'Bob Smith', email: 'bob@example.com' },
      { name: 'Charlie Brown', email: 'charlie@example.com' },
      { name: 'Diana Prince', email: 'diana@example.com' },
      { name: 'Eve Wilson', email: 'eve@example.com' }
    ];
    
    // Check if data already exists
    db.get('SELECT COUNT(*) as count FROM users', (err, row) => {
      if (err) {
        reject(err);
        return;
      }
      
      if (row.count > 0) {
        logger.info('Sample data already exists');
        resolve();
        return;
      }
      
      // Insert sample data
      const stmt = db.prepare('INSERT OR IGNORE INTO users (name, email) VALUES (?, ?)');
      
      sampleUsers.forEach(user => {
        stmt.run(user.name, user.email);
      });
      
      stmt.finalize((err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  });
}

/**
 * Get all users
 */
function getAllUsers() {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM users ORDER BY created_at DESC', (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

/**
 * Get user by ID
 */
function getUserById(id) {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM users WHERE id = ?', [id], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
}

/**
 * Create new user
 */
function createUser(name, email) {
  return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO users (name, email) VALUES (?, ?)',
      [name, email],
      function(err) {
        if (err) {
          reject(err);
        } else {
          getUserById(this.lastID).then(resolve).catch(reject);
        }
      }
    );
  });
}

module.exports = {
  init,
  getAllUsers,
  getUserById,
  createUser
};

