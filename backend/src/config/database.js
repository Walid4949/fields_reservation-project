const sqlite3 = require('sqlite3').verbose();

  // Initialize database
  const db = new sqlite3.Database('fields.db');

  // Create tables
  db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      email TEXT,
      password TEXT
    )`);
    db.run(`CREATE TABLE IF NOT EXISTS reservations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user TEXT,
      field TEXT,
      date TEXT,
      time TEXT
    )`);
  });

  module.exports = db;