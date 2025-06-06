const db = require('../config/database');
  const { TIMES } = require('../utils/constants');

  // Register a new user
  const register = (req, res, next) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ success: false, error: 'All fields (username, email, password) are required' });
    }
    db.run(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, password],
      (err) => {
        if (err) {
          if (err.code === 'SQLITE_CONSTRAINT') {
            return res.status(400).json({ success: false, error: 'Username or email already exists' });
          }
          return next(err);
        }
        res.status(201).json({ success: true });
      }
    );
  };

  // Create a reservation with conflict checking
  const reserve = (req, res, next) => {
    const { user, field, date, time } = req.body;
    if (!user || !field || !date || !time) {
      return res.status(400).json({ success: false, error: 'All fields (user, field, date, time) are required' });
    }

    const toMinutes = (t) => parseInt(t.split(':')[0]) * 60 + parseInt(t.split(':')[1]);
    db.all('SELECT time FROM reservations WHERE field = ? AND date = ?', [field, date], (err, rows) => {
      if (err) return next(err);
      const reqTime = toMinutes(time);
      for (const row of rows) {
        const rTime = toMinutes(row.time);
        if (Math.abs(rTime - reqTime) < 90) { // Check for 1.5-hour conflict
          return res.status(400).json({ success: false, error: 'Time slot unavailable within 1.5 hours' });
        }
      }
      db.run(
        'INSERT INTO reservations (user, field, date, time) VALUES (?, ?, ?, ?)',
        [user, field, date, time],
        (err) => {
          if (err) return next(err);
          res.status(201).json({ success: true });
        }
      );
    });
  };

  // Get availability for a field on a specific date
const getAvailability = (req, res, next) => {
  const { field, date } = req.query;
  if (!field || !date) {
    return res.status(400).json({ success: false, error: 'Field and date are required' });
  }
  db.all('SELECT time FROM reservations WHERE field = ? AND date = ?', [field, date], (err, rows) => {
    if (err) return next(err);
    const reserved = rows.map((r) => r.time);
    const slots = TIMES.map((t) => reserved.includes(t));
    res.json({ slots });
  });
};
  module.exports = { register, reserve, getAvailability };