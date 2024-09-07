const sqlite3 = require('sqlite3').verbose();

class Database {
  constructor(dbPath) {
    this.db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error('Ошибка при подключении к базе данных:', err.message);
      } else {
        console.log('Подключение к базе данных успешно установлено');
        this.initTable();
      }
    });
  }

  initTable() {
    const sql = `
      CREATE TABLE IF NOT EXISTS users (
        user_id INTEGER PRIMARY KEY,
        score INTEGER DEFAULT 0
      )
    `;
    this.db.run(sql);
  }

  addUser(userId) {
    const sql = 'INSERT OR IGNORE INTO users (user_id) VALUES (?)';
    return new Promise((resolve, reject) => {
      this.db.run(sql, [userId], (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }

  updateScore(userId, score) {
    const sql = 'UPDATE users SET score = ? WHERE user_id = ?';
    return new Promise((resolve, reject) => {
      this.db.run(sql, [score, userId], (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }

  getScore(userId) {
    const sql = 'SELECT score FROM users WHERE user_id = ?';
    return new Promise((resolve, reject) => {
      this.db.get(sql, [userId], (err, row) => {
        if (err) reject(err);
        else resolve(row ? row.score : null);
      });
    });
  }

  close() {
    this.db.close((err) => {
      if (err) {
        console.error('Ошибка при закрытии базы данных:', err.message);
      } else {
        console.log('Соединение с базой данных закрыто');
      }
    });
  }
}

module.exports = Database;
